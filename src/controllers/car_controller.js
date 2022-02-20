const Joi = require('joi');
const knex = require('../configs/knex/knex')


async function getCars(req, res) {

    const query = knex.select().from('cars')
    const data = await query
    res.send({cars: data})
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

async function getCarsById(req, res) {

    const query = knex.select().from('cars').where('car_id',
        req.params['car_id'])
    const data = await query
    res.send({car: data})
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

async function deleteCarById(req, res) {
    const query = knex('cars').where('car_id', req.params['car_id']).del()
    await query
    res.send('Car with id=' + req.params['car_id'].toString() + ' deleted successfully')

}

module.exports = {
    getCars,
    postCars,
    getCarsById,
    updateCarById,
    deleteCarById
};