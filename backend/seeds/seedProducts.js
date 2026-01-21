const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony', 'Nothing', 'Asus'];
const categories = ['flagship', 'mid_range', 'budget', 'gaming'];
const colors = ['Black', 'White', 'Silver', 'Blue', 'Green', 'Purple', 'Red'];
const osVersions = ['iOS 17', 'Android 14', 'Android 13', 'Android 12'];

const specifications = [
    {
        display: '6.7-inch Super Retina XDR',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
        battery: '4422mAh',
        os: 'iOS 17'
    },
    {
        display: '6.8-inch Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        storage: '512GB',
        camera: '200MP Wide, 12MP Ultra Wide, 10MP Telephoto',
        battery: '5000mAh',
        os: 'Android 14'
    },
    {
        display: '6.7-inch LTPO OLED',
        processor: 'Tensor G3',
        ram: '12GB',
        storage: '256GB',
        camera: '50MP Main, 48MP Ultra Wide, 48MP Telephoto',
        battery: '5050mAh',
        os: 'Android 14'
    }
];

const products = [];

// Generate sample products
for (let i = 1; i <= 50; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const specIndex = Math.floor(Math.random() * specifications.length);

    let basePrice;
    switch (category) {
        case 'flagship': basePrice = 999; break;
        case 'mid_range': basePrice = 599; break;
        case 'gaming': basePrice = 799; break;
        default: basePrice = 299;
    }

    // Add some variation to price
    const price = basePrice + Math.floor(Math.random() * 300);
    const stock = Math.floor(Math.random() * 100);

    const product = {
        name: `${brand} Phone ${2020 + Math.floor(Math.random() * 5)}`,
        brand,
        model: `Model-${brand.substring(0, 3).toUpperCase()}${i}`,
        sku: `${brand.substring(0, 3).toUpperCase()}${i.toString().padStart(4, '0')}`,
        price,
        stock,
        description: `Latest ${brand} smartphone with premium features and cutting-edge technology. Perfect for everyday use and professional needs.`,
        specifications: specifications[specIndex],
        category,
        releaseDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        images: [
            {
                url: `https://images.unsplash.com/photo-${1511707171634 + i}?w=800&h=600&fit=crop`,
                alt: `${brand} smartphone`
            }
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        weight: 180 + Math.floor(Math.random() * 50),
        dimensions: {
            height: 150 + Math.floor(Math.random() * 20),
            width: 70 + Math.floor(Math.random() * 10),
            depth: 7 + Math.floor(Math.random() * 3)
        },
        warranty: 12 + Math.floor(Math.random() * 12),
        ratings: {
            average: 4 + Math.random(),
            count: Math.floor(Math.random() * 1000)
        }
    };

    products.push(product);
}

// Connect to MongoDB and seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product_management')
    .then(async () => {
        console.log('✅ Connected to MongoDB');


        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');


        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);


        const totalProducts = await Product.countDocuments();
        const brandsCount = await Product.aggregate([
            { $group: { _id: '$brand', count: { $sum: 1 } } }
        ]);

        console.log('\n📊 Seeding Statistics:');
        console.log(`   Total Products: ${totalProducts} `);
        console.log('   Brands Distribution:');
        brandsCount.forEach(brand => {
            console.log(`     ${brand._id}: ${brand.count} products`);
        });

        mongoose.connection.close();
        console.log('\n✅ Seeding completed successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    });