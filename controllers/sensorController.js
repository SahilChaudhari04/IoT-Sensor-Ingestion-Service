const SensorData = require('../models/SensorData');

const ingestData = async (req, res) => {
    try {
        const { deviceId, temperature, timestamp } = req.body;

        if (!deviceId || temperature === undefined) {
            return res.status(400).json({ error: 'deviceId and temperature are required' });
        }

        const newData = new SensorData({
            deviceId,
            temperature,
            timestamp: timestamp || Date.now()
        });

        await newData.save();

        res.status(201).json({ message: 'Data ingested successfully', data: newData });
    } catch (error) {
        console.error('Error in ingestData:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getLatestData = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const latestData = await SensorData.findOne({ deviceId })
            .sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for this device' });
        }

        res.status(200).json(latestData);
    } catch (error) {
        console.error('Error in getLatestData:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    ingestData,
    getLatestData
};
