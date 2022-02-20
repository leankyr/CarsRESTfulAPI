const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driver_controller');

router.get('/drivers', driversController.getDrivers);
router.post('/drivers', driversController.postDrivers);
router.get('/drivers/:driver_id', driversController.getDriversById);
router.put('/drivers/:driver_id', driversController.updateDriverById);
router.delete('/drivers/:driver_id', driversController.deleteDriverById);

module.exports = router;
