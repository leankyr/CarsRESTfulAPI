const knex = require('../configs/knex/knex');

function getDrivers(){
    return knex.select().from('drivers');
}

async function postDrivers(value){
    const query = knex('drivers').insert({
        first_name: value.first_name,
        last_name: value.last_name,
        // created_on: new Date().toISOString(),
        car_id: value.car_id
    });
    await query;
    return null;
}

function getDriverById(driver_id){
    return knex.select().from('drivers').where('driver_id',
        driver_id);

}

async function updateDriverById(driver_id, value){
    const query = knex('drivers').where({ driver_id: driver_id }).update({
        first_name: value.first_name,
        last_name: value.last_name,
        car_id: value.car_id
    });
    await query;
    return null;
}

async function deleteDriverById(driver_id){
    const query = knex('drivers').where('driver_id', driver_id).del();
    await query;
    return null;
}

module.exports = {
    getDrivers,
    postDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById
}