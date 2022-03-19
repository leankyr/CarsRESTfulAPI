const schemas = require('./schemas');
const driver_repo = require('../repositories/driver_repository');
const log = require('../utils/logger');
const car_repo = require("../repositories/car_repository");

async function getDrivers (req, res) {
    const query = driver_repo.getDrivers()
    const data = await query;
    res.send({ drivers: data });
}

async function getDriversById (req, res) {
    const query = driver_repo.getDriverById(req.params.driver_id);
    const data = await query;
    res.send({ driver: data });
}

async function postDrivers (req, res) {
    const { error, value } = schemas.driverSchema.validate(req.body);
    if (error === undefined) {
        try {
            const data = await driver_repo.postDrivers(value);
            res.status(201);
            res.json({success: true, message: 'Data Posted Successfully', data: data});
        } catch (error){
            res.status(400);
            res.send('Foreign key does not exist in table cars');
        }
    } else {
        log.log.error('Post Drivers: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function updateDriverById (req, res) {
    const { error, value } = schemas.driverSchema.validate(req.body);
    if (error === undefined) {
        const data = await driver_repo.updateDriverById(req.params.driver_id, value) // respond back to request
        res.json({ success: true, message: 'Drivers Updated Successfully', data: data});
    } else {
        log.log.error('Update Drivers By Id: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function deleteDriverById (req, res) {
    const data = await driver_repo.deleteDriverById(req.params.driver_id)
    res.send({
        msg: 'Driver with id=' + req.params.driver_id.toString() + ' deleted successfully',
        data: data});
}

module.exports = {
    getDrivers,
    postDrivers,
    getDriversById,
    updateDriverById,
    deleteDriverById
};
