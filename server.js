require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const connectMQTT = require('./mqtt/subscriber');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/sensor', sensorRoutes);

// Database Connection
connectDB();

// MQTT Connection (Bonus)
connectMQTT();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
