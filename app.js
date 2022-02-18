require('dotenv').config();
const express = require('express')
const {request} = require("express");
const Joi = require('joi');
const app = express()
const port = 3000
app.use(express.json());

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

app.get('/cars', (req, res) => {

    knex.select().from('cars').then(function(data){
        res.send({cars: data})
    })

})

app.get('/drivers', (req, res) => {

    knex.select().from('drivers').then(function(data){
        res.send({drivers: data})
    })

})

app.post('/cars', (req, res) => {
    let ts = new Date();
    const schema = Joi.object().keys({
        plate: Joi.string().alphanum().min(7).max(7).required(),
        color: Joi.string().alphanum().min(2).max(30).required(),
    });
    const result = schema.validate(req.body)
    if(result.error == null) {
        knex('cars').insert({
            plate: req.body['plate'],
            color: req.body['color'],
            created_on: ts.toISOString()
        }).then(function (result) {
            res.json({success: true, message: 'Data Posted Successfully'});     // respond back to request
        })
    } else {
        res.status(400)
        res.send(result.error.details)
    }
})

app.post('/drivers', (req, res) => {
    let ts = new Date();
    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        car_id: Joi.number().integer().min(0)
    });

    const result = schema.validate(req.body)
    console.log(result.error)
    if(result.error == null) {
        knex('drivers').insert({
            first_name: req.body['first_name'],
            last_name: req.body['last_name'],
            created_on: ts.toISOString(),
            car_id: req.body['car_id']
        }).then(function (result) {
            res.json({success: true, message: 'Data Posted Successfully'});     // respond back to request
        })
    } else {
        res.status(400)
        res.send(result.error.details)
    }
})

app.get('/cars/:carid', (req, res) => {

    knex.select().from('cars').where('car_id',
        req.params['carid']).then(function(data){
        res.send({car: data})
    })

})

app.get('/drivers/:driver_id', (req, res) => {

    knex.select().from('drivers').where('driver_id',
        req.params['driver_id']).then(function(data){
        res.send({driver: data})
    })

})

app.put('/cars/:carid', (req, res) => {

    const schema = Joi.object().keys({
        plate: Joi.string().alphanum().min(7).max(7).required(),
        color: Joi.string().alphanum().min(2).max(30).required(),
    });
    const result = schema.validate(req.body)
    if(result.error == null) {
        knex('cars').where({car_id: req.params['carid']}).update({
            plate: req.body['plate'],
            color: req.body['color'],
        }).then(function (result) {
            res.json({success: true, message: 'Data updated Successfully'});     // respond back to request
        })
    } else {
        res.status(400)
        res.send(result.error.details)
    }

})

app.put('/drivers/:driver_id', (req, res) => {

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        car_id: Joi.number().integer().min(0)
    });

    const result = schema.validate(req.body)
    console.log(result.error)
    if(result.error == null) {
        knex('drivers').where({driver_id: req.params['driver_id']}).update({
            first_name: req.body['first_name'],
            last_name: req.body['last_name'],
            car_id: req.body['car_id']
        }).then(function (result) {
            res.json({success: true, message: 'Data Updated Successfully'});     // respond back to request
        })
    } else {
        res.status(400)
        res.send(result.error.details)
    }

})

app.delete('/cars/:carid', (req, res) => {

    knex('cars').where('car_id', req.params['carid']).del().then(function(data){
        res.send('Car with id=' + req.params['carid'].toString() + ' deleted successfully')
    })
})

app.delete('/drivers/:driver_id', (req, res) => {

    knex('drivers').where('driver_id', req.params['driver_id']).del().then(function(data){
        res.send('Driver with id=' + req.params['driver_id'].toString() + ' deleted successfully')
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})