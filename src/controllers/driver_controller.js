const knex = require('../configs/knex/knex');
const schemas = require('../configs/schemas');
const log = require('../logger');

async function getDrivers (req, res) {
  const query = knex.select().from('drivers');
  const data = await query;
  res.send({ drivers: data });
}

async function getDriversById (req, res) {
  const query = knex.select().from('drivers').where('driver_id',
    req.params.driver_id);
  const data = await query;
  res.send({ driver: data });
}

async function postDrivers (req, res) {
  const { error, value } = schemas.driverSchema.validate(req.body);
  if (error === undefined) {
    const query = knex('drivers').insert({
      first_name: value.first_name,
      last_name: value.last_name,
      created_on: new Date().toISOString(),
      car_id: req.body.car_id
    }); // respond back to request
    await query;
    res.json({ success: true, message: 'Data Posted Successfully' });
  } else {
    log.log.error('Post Drivers: Error while processing the input');
    res.status(400);
    res.send(error.details);
  }
}

async function updateDriverById (req, res) {
  const { error, value } = schemas.driverSchema.validate(req.body);
  if (error === undefined) {
    const query = knex('drivers').where({ driver_id: req.params.driver_id }).update({
      first_name: value.first_name,
      last_name: value.last_name,
      car_id: value.car_id
    }); // respond back to request
    await query;
    res.json({ success: true, message: 'Drivers Updated Successfully' });
  } else {
    log.log.error('Update Drivers By Id: Error while processing the input');
    res.status(400);
    res.send(error.details);
  }
}

async function deleteDriverById (req, res) {
  const query = knex('drivers').where('driver_id', req.params.driver_id).del();
  await query;
  res.send('Driver with id=' + req.params.driver_id.toString() + ' deleted successfully');
}

module.exports = {
  getDrivers,
  postDrivers,
  getDriversById,
  updateDriverById,
  deleteDriverById
};
