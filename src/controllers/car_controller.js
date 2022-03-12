const schemas = require('./schemas');
const log = require('../utils/logger');
const tomorrow = require('../third_party/tomorrow_io');
const car_repo = require('../repositories/car_repository');

async function getCars (req, res) {
    log.log.debug('Get Cars Called');
    const query = car_repo.getCars();
    const data = await query;
    const locationMunich = [48.1351, 11.5820];
    const weatherMunich = await tomorrow.getLocationWeather(locationMunich)
    res.send({ cars: data,
              weatherMunich: weatherMunich
          });
}

async function postCars (req, res) {
    log.log.debug('Post Cars Called');
    const { error, value } = schemas.carSchema.validate(req.body);
    if (error === undefined) {
        await car_repo.postCars(value);
        res.json({ success: true, message: 'Data Posted Successfully' });
    } else {
        log.log.error('Post Cars: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function getCarsById (req, res) {
    log.log.debug('Get CarsById called');
    const query = car_repo.getCarsById(req.params.car_id);
    const data = await query;
    res.send({ car: data });
}

async function updateCarById (req, res) {
    log.log.debug('Update CarsById called');
    const { error, value } = schemas.carSchema.validate(req.body);
    if (error === undefined) {
        await car_repo.UpdateCarById(req.params.car_id, value) // respond back to request
        res.json({ success: true, message: 'Cars Updated Successfully' });
    } else {
        log.log.error('Update Car By Id: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function deleteCarById (req, res) {
    log.log.debug('Delete CarsById called');
    await car_repo.deleteCarById(req.params.car_id)
    res.send('Car with id=' + req.params.car_id.toString() + ' deleted successfully');
}

module.exports = {
    getCars,
    postCars,
    getCarsById,
    updateCarById,
    deleteCarById
};
