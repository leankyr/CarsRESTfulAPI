const knex = require('../configs/knex/knex');

function getCars(){
    return knex.select().from('cars');

}

async function postCars(value){
  const query = knex('cars').insert({
        plate: value.plate,
        color: value.color
        // created_on: new Date().toISOString()
    });
    await query;
    return null;
}

function getCarsById(car_id){
    return knex.select().from('cars').where('car_id',
        car_id);

}

async function UpdateCarById(car_id, value){
    const query = knex('cars').where({ car_id: car_id }).update({
        plate: value.plate,
        color: value.color
    });
    await query;
    return null;
}

async function deleteCarById(car_id){
    const query = knex('cars').where('car_id', car_id).del();
    await query;
    return null;
}

module.exports = {
    getCars,
    postCars,
    getCarsById,
    UpdateCarById,
    deleteCarById
};