const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    index: true 
  },
  temperature: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
