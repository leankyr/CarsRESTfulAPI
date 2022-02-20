const Joi = require('joi');
const knex = require('knex')({
    client: 'pg',
    version: '12.9',
    connection: {
        host : process.env.HOST,
        port : process.env.PORT,
        user : process.env.USER,
        password : process.env.PASS,
        database : process.env.DB
    }
});


async function getCars(req, res) {

    const query = knex.select().from('cars')
    const data = await query
    res.send({cars: data})
}

async function getDrivers(req, res) {

    const query = knex.select().from('drivers')
    const data = await query
    res.send({drivers: data})
}

async function postCars(req, res) {

    const schema = Joi.object().keys({
        plate: Joi.string().alphanum().min(7).max(7).required(),
        color: Joi.string().min(2).max(30).required(),
    });
    const {error, value} = schema.validate(req.body)
    if(error === undefined) {
        const query = knex('cars').insert({
            plate: value.plate,
            color: value.color,
            created_on: new Date().toISOString()
        })    // respond back to request
        await query
        res.json({success: true, message: 'Data Posted Successfully'});

    } else {
        res.status(400)
        res.send(error.details)
    }
}

async function postDrivers(req, res) {

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        car_id: Joi.number().integer().min(0)
    });
    const {error, value} = schema.validate(req.body)
    if(error === undefined) {
        const query = knex('drivers').insert({
            first_name: value.first_name,
            last_name: value.last_name,
            created_on: new Date().toISOString(),
            car_id: req.body['car_id']
        })    // respond back to request
        await query
        res.json({success: true, message: 'Data Posted Successfully'});

    } else {
        res.status(400)
        res.send(error.details)
    }
}

async function getCarsById(req, res) {

    const query = knex.select().from('cars').where('car_id',
        req.params['car_id'])
    const data = await query
    res.send({car: data})
}

async function getDriversById(req, res) {

    const query =  knex.select().from('drivers').where('driver_id',
        req.params['driver_id'])
    const data = await query
    res.send({driver: data})
}

async function updateCarById(req, res) {

    const schema = Joi.object().keys({
        plate: Joi.string().alphanum().min(7).max(7).required(),
        color: Joi.string().min(2).max(30).required(),
    });
    const {error, value} = schema.validate(req.body)
    if(error === undefined) {
        const query = knex('cars').where({car_id: req.params['car_id']}).update({
            plate: value.plate,
            color: value.color,
        })    // respond back to request
        await query
        res.json({success: true, message: 'Cars Updated Successfully'});

    } else {
        res.status(400)
        res.send(error.details)
    }
}

async function updateDriverById(req, res) {

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        car_id: Joi.number().integer().min(0)
    });
    const {error, value} = schema.validate(req.body)
    if(error === undefined) {
        const query = knex('drivers').where({driver_id: req.params['driver_id']}).update({
            first_name: value.first_name,
            last_name: value.last_name,
            car_id: value.car_id
        })    // respond back to request
        await query
        res.json({success: true, message: 'Drivers Updated Successfully'});

    } else {
        res.status(400)
        res.send(error.details)
    }
}

async function deleteCarById(req, res) {
    const query = knex('cars').where('car_id', req.params['car_id']).del()
    await query
    res.send('Car with id=' + req.params['car_id'].toString() + ' deleted successfully')

}

async function deleteDriverById(req, res) {
    const query = knex('drivers').where('driver_id', req.params['driver_id']).del()
    await query
    res.send('Driver with id=' + req.params['driver_id'].toString() + ' deleted successfully')

}


module.exports = {
    getCars,
    getDrivers,
    postCars,
    postDrivers,
    getCarsById,
    getDriversById,
    updateCarById,
    updateDriverById,
    deleteCarById,
    deleteDriverById
};