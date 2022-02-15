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
        host : '127.0.0.1',
        port : 5432,
        user : 'leankyr',
        password : 'lalala',
        database : 'CarsDB'
    }
});


app.get('/cars', (req, res) => {

    knex.select().from('cars').then(function(data){
        res.send({data: data})
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