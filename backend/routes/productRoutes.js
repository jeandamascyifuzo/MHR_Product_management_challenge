const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/productController');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

router.get('/stats/summary', getProductStats);
router.get('/stats/brands', getBrandStats);

router.get('/stock/:status', getProductsByStockStatus);
router.get('/search/:query', searchProducts);
router.get('/recent/:limit?', getRecentProducts);

module.exports = router;