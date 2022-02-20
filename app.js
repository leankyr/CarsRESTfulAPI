require('dotenv').config();
const express = require('express')
// const {request} = require("express");
const Joi = require('joi');
const app = express()
const port = 3000
app.use(express.json());
const carsRouter = require('./src/routes/car_routes')



app.use('/', carsRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})