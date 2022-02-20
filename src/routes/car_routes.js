const express = require('express');
const router = express.Router();
const carsController = require('../controllers/controllers');

router.get('/cars', carsController.getCars);
router.get('/drivers', carsController.getDrivers);
router.post('/cars', carsController.postCars);
router.post('/drivers', carsController.postDrivers);
router.get('/cars/:car_id', carsController.getCarsById);
router.get('/drivers/:driver_id', carsController.getDriversById);
router.put('/cars/:car_id', carsController.updateCarById);
router.put('/drivers/:driver_id', carsController.updateDriverById);
router.delete('/cars/:car_id', carsController.deleteCarById);
router.delete('/drivers/:driver_id', carsController.deleteDriverById);

module.exports = router;