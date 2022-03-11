require('dotenv').config();
const express = require('express');
// const {request} = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const carsRouter = require('./routes/car_routes');
const driversRouter = require('./routes/driver_routes');
const axios = require('axios').default;
const log = require('./logger');
const tomorrow = require('./third_party/tomorrow_io')

// GET request for remote image in node.js
axios({
    method: 'get',
    url: tomorrow.getTimelineURL + '?' + tomorrow.getTimelineParameters,
    responseType: 'json'
})
    .then(function (response) {
        log.log.debug(response.data);
    });

app.use('/', carsRouter);
app.use('/', driversRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
