const mqtt = require('mqtt');
const SensorData = require('../models/SensorData');

const connectMQTT = () => {
    const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://test.mosquitto.org';
    const client = mqtt.connect(brokerUrl);

    const topicPattern = 'iot/sensor/+/temperature';

    client.on('connect', () => {
        console.log(`Connected to MQTT Broker: ${brokerUrl}`);

        client.subscribe(topicPattern, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${topicPattern}`);
            } else {
                console.error('MQTT Subscribe Error:', err);
            }
        });
    });

    client.on('message', async (topic, message) => {
        try {
            
            const topicParts = topic.split('/');
            const deviceId = topicParts[2]; 

            const payload = JSON.parse(message.toString());

            console.log(`MQTT Message received on ${topic}:`, payload);

            if (!deviceId || payload.temperature === undefined) {
                console.warn('Invalid MQTT message format or missing data');
                return;
            }

            const newData = new SensorData({
                deviceId,
                temperature: payload.temperature,
                timestamp: payload.timestamp || Date.now()
            });

            await newData.save();
            console.log(`Data saved for device ${deviceId} via MQTT`);

        } catch (error) {
            console.error('Error processing MQTT message:', error.message);
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Client Error:', err);
    });
};

module.exports = connectMQTT;
