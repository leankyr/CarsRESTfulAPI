const Joi = require('joi');

const car_schema = Joi.object().keys({
    plate: Joi.string().alphanum().min(7).max(7).required(),
    color: Joi.string().min(2).max(30).required(),
});

const driver_schema = Joi.object().keys({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    car_id: Joi.number().integer().min(0)
});

module.exports = {
    car_schema,
    driver_schema
}