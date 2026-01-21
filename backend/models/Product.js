const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        enum: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony', 'Nothing', 'Asus', 'Motorola', 'Nokia']
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    specifications: {
        display: String,
        processor: String,
        ram: String,
        storage: String,
        camera: String,
        battery: String,
        os: String
    },
    category: {
        type: String,
        enum: ['flagship', 'mid_range', 'budget', 'gaming', 'business'],
        default: 'mid_range'
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    images: [{
        url: String,
        alt: String
    }],
    stockStatus: {
        type: String,
        enum: ['in_stock', 'low_stock', 'out_of_stock'],
        default: 'in_stock'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'discontinued'],
        default: 'active'
    },
    ratings: {
        average: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    color: {
        type: String,
        default: 'Black'
    },
    weight: {
        type: Number,
        min: 0
    },
    dimensions: {
        height: Number,
        width: Number,
        depth: Number
    },
    warranty: {
        type: Number,
        default: 12,
        min: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function () {
    return `$${this.price.toLocaleString()}`;
});

// Virtual for formatted release date
productSchema.virtual('formattedReleaseDate').get(function () {
    return this.releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Pre-save middleware to update stock status
productSchema.pre('save', function (next) {
    if (this.stock > 20) {
        this.stockStatus = 'in_stock';
    } else if (this.stock > 0) {
        this.stockStatus = 'low_stock';
    } else {
        this.stockStatus = 'out_of_stock';
    }

    // Generate SKU if not provided
    if (!this.sku) {
        this.sku = `${this.brand.substring(0, 3).toUpperCase()}${this.model.replace(/\s/g, '').toUpperCase()}${Date.now().toString().slice(-4)}`;
    }

    next();
});

// Indexes for better query performance
productSchema.index({ name: 'text', model: 'text', description: 'text' });
productSchema.index({ brand: 1, category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stockStatus: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);