const knex = require('../configs/knex/knex');
const schemas = require('../configs/schemas');
const log = require('../logger');

async function getCars(req, res) {
    log.log.debug('Get Cars Called');
    const query = knex.select().from('cars');
    const data = await query;
    res.send({cars: data});
}

async function postCars(req, res) {
    log.log.debug('Post Cars Called');
    const {error, value} = schemas.carSchema.validate(req.body);
    if (error === undefined) {
        const query = knex('cars').insert({
            plate: value.plate,
            color: value.color,
            created_on: new Date().toISOString()
        }); // respond back to request
        await query;
        res.json({success: true, message: 'Data Posted Successfully'});
    } else {
        log.log.error('Post Cars: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function getCarsById(req, res) {
    log.log.debug('Get CarsById called');
    const query = knex.select().from('cars').where('car_id',
        req.params.car_id);
    const data = await query;
    res.send({car: data});
}

async function updateCarById(req, res) {
    log.log.debug('Update CarsById called');
    const {error, value} = schemas.carSchema.validate(req.body);
    if (error === undefined) {
        const query = knex('cars').where({car_id: req.params.car_id}).update({
            plate: value.plate,
            color: value.color
        }); // respond back to request
        await query;
        res.json({success: true, message: 'Cars Updated Successfully'});
    } else {
        log.log.error('Update Car By Id: Error while processing the input');
        res.status(400);
        res.send(error.details);
    }
}

async function deleteCarById(req, res) {
    log.log.debug('Delete CarsById called');
    const query = knex('cars').where('car_id', req.params.car_id).del();
    await query;
    res.send('Car with id=' + req.params.car_id.toString() + ' deleted successfully');
}

module.exports = {
    getCars,
    postCars,
    getCarsById,
    updateCarById,
    deleteCarById
};
