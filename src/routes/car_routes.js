const express = require('express');
const router = express.Router();
const carsController = require('../controllers/car_controller');

router.get('/cars', carsController.getCars);
router.post('/cars', carsController.postCars);
router.get('/cars/:car_id', carsController.getCarsById);
router.put('/cars/:car_id', carsController.updateCarById);
router.delete('/cars/:car_id', carsController.deleteCarById);

module.exports = router;
