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

app.post('/cars', (req, res) => {

    console.log(req.body)
    const plate = req.body['plate'];
    const color = req.body['color'];

    let ts = new Date();
    console.log(ts.toISOString())

    knex('cars').insert({plate: plate, color: color, created_on: ts.toISOString()}).then( function (result) {
        res.json({ success: true, message: 'Data Posted Successfully' });     // respond back to request
    })

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

app.delete('/cars/:carid', (req, res) => {

    knex('cars').where('car_id', req.params['carid']).del().then(function(data){
        res.send('Car with id=' + req.params['carid'].toString() + ' deleted successfully')
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})