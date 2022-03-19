const knex = require('../configs/knex/knex');

function getCars(){
    return knex.select().from('cars');

}

async function postCars(value){
  return knex('cars').insert({
        plate: value.plate,
        color: value.color
        // created_on: new Date().toISOString()
    }).returning('*');


}

function getCarsById(car_id){
    return knex.select().from('cars').where('car_id',
        car_id);

}

async function UpdateCarById(car_id, value){
    const query = knex('cars').where({ car_id: car_id }).update({
        plate: value.plate,
        color: value.color
    }).returning('*');
    await query;
    return query;
}

async function deleteCarById(car_id){
    return knex('cars').where('car_id', car_id).del().returning('*');

}

module.exports = {
    getCars,
    postCars,
    getCarsById,
    UpdateCarById,
    deleteCarById
};