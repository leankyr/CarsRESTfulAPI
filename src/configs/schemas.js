const Joi = require('joi');
const carSchema = Joi.object().keys({
  plate: Joi.string().alphanum().min(7).max(7).required(),
  color: Joi.string().min(2).max(30).required()
});

const driverSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  car_id: Joi.number().integer().min(0)
});

module.exports = {
  carSchema,
  driverSchema
};
