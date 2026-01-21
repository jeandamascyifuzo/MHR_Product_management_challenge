const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getProducts = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        sort = '-createdAt',
        brand,
        category,
        status,
        stockStatus,
        minPrice,
        maxPrice,
        search
    } = req.query;

    const query = {};

    if (brand) {
        query.brand = brand;
    }

    if (category) {
        query.category = category;
    }

    if (status) {
        query.status = status;
    }

    if (stockStatus) {
        query.stockStatus = stockStatus;
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { model: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

    const total = await Product.countDocuments(query);

    res.status(200).json({
        status: 'success',
        count: products.length,
        total,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        data: products
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json({
        status: 'success',
        data: product
    });
});

const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        brand,
        model,
        sku,
        price,
        stock,
        description,
        specifications,
        category,
        releaseDate,
        images,
        color,
        weight,
        dimensions,
        warranty
    } = req.body;

    const existingProduct = await Product.findOne({ sku: sku?.toUpperCase() });
    if (existingProduct) {
        res.status(400);
        throw new Error('Product with this SKU already exists');
    }

    const product = await Product.create({
        name,
        brand,
        model,
        sku: sku?.toUpperCase(),
        price,
        stock,
        description,
        specifications,
        category,
        releaseDate: releaseDate || Date.now(),
        images,
        color,
        weight,
        dimensions,
        warranty
    });

    res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        data: product
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    if (req.body.sku && req.body.sku !== product.sku) {
        const existingProduct = await Product.findOne({ sku: req.body.sku.toUpperCase() });
        if (existingProduct) {
            res.status(400);
            throw new Error('Product with this SKU already exists');
        }
    }

    Object.keys(req.body).forEach(key => {
        product[key] = req.body[key];
    });

    const updatedProduct = await product.save();

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await product.deleteOne();

    res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
    });
});

const getProductStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalStock = await Product.aggregate([
        { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);
    const totalValue = await Product.aggregate([
        { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$stock'] } } } }
    ]);
    const averagePrice = await Product.aggregate([
        { $group: { _id: null, average: { $avg: '$price' } } }
    ]);

    const stockStatusStats = await Product.aggregate([
        { $group: { _id: '$stockStatus', count: { $sum: 1 } } }
    ]);

    const brandStats = await Product.aggregate([
        { $group: { _id: '$brand', count: { $sum: 1 }, avgPrice: { $avg: '$price' }, totalStock: { $sum: '$stock' } } },
        { $sort: { count: -1 } }
    ]);

    const categoryStats = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            summary: {
                totalProducts,
                totalStock: totalStock[0]?.total || 0,
                totalValue: totalValue[0]?.total || 0,
                averagePrice: averagePrice[0]?.average || 0
            },
            stockStatus: stockStatusStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            brands: brandStats,
            categories: categoryStats
        }
    });
});

const getBrandStats = asyncHandler(async (req, res) => {
    const brandStats = await Product.aggregate([
        {
            $group: {
                _id: '$brand',
                totalProducts: { $sum: 1 },
                totalStock: { $sum: '$stock' },
                averagePrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
            }
        },
        { $sort: { totalProducts: -1 } }
    ]);

    res.status(200).json({
        status: 'success',
        count: brandStats.length,
        data: brandStats
    });
});

const getProductsByStockStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    const validStatuses = ['in_stock', 'low_stock', 'out_of_stock'];

    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid stock status');
    }

    const products = await Product.find({ stockStatus: status })
        .sort('-createdAt')
        .limit(20);

    res.status(200).json({
        status: 'success',
        count: products.length,
        data: products
    });
});

const searchProducts = asyncHandler(async (req, res) => {
    const { query } = req.params;

    const products = await Product.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { model: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    })
        .sort('-createdAt')
        .limit(20);

    res.status(200).json({
        status: 'success',
        count: products.length,
        data: products
    });
});

const getRecentProducts = asyncHandler(async (req, res) => {
    const limit = parseInt(req.params.limit) || 10;

    const products = await Product.find()
        .sort('-createdAt')
        .limit(limit);

    res.status(200).json({
        status: 'success',
        count: products.length,
        data: products
    });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats,
    getBrandStats,
    getProductsByStockStatus,
    searchProducts,
    getRecentProducts
};