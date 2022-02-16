require('dotenv').config();
const express = require('express')
const {request} = require("express");
const Console = require("console");
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

app.get('/cars/:carid', (req, res) => {

    knex.select().from('cars').where('car_id',req.params['carid'] ).then(function(data){
        res.send({cars: data})
    })

})


app.post('/cars', (req, res) => {

    console.log(req.body)
    const plate = req.body['plate'];
    const color = req.body['color'];

    var ts = new Date();
    console.log(ts.toISOString())

    knex('cars').insert({plate: plate, color: color, created_on: ts.toISOString()}).then( function (result) {
        res.json({ success: true, message: 'Data Posted Successfully' });     // respond back to request
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})