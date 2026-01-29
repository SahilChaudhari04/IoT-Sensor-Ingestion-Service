const express = require('express');
const router = express.Router();
const { ingestData, getLatestData } = require('../controllers/sensorController');

router.post('/ingest', ingestData);
router.get('/:deviceId/latest', getLatestData);

module.exports = router;
