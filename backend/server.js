const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();


const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Product API is running',
        timestamp: new Date().toISOString()
    });
});

app.use(require('./middleware/errorMiddleware'));

app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Product API running on port ${PORT}`);
});