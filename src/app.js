require('dotenv').config();
const express = require('express');
// const {request} = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const carsRouter = require('./routes/car_routes');
const driversRouter = require('./routes/driver_routes');
const axios = require('axios').default;
const queryString = require('query-string');
const moment = require('moment');
const log = require('./logger');

// set the Timelines GET endpoint as the target URL
const getTimelineURL = 'https://api.tomorrow.io/v4/timelines';

// get your key from app.tomorrow.io/development/keys
const apikey = 'JO0vjBMNVhJy2DYIzfrBYy8kDeh5D68i';

// pick the location, as a latlong pair
const location = [48.1351, 11.5820];

// list the fields
const fields = [
    'temperature',
    'temperatureApparent'
];

// choose the unit system, either metric or imperial
const units = 'metric';

// set the timesteps, like "current", "1h" and "1d"
const timesteps = ['current', '1h', '1d'];
// configure the time frame up to 6 hours back and 15 days out
const now = moment.utc();
const startTime = moment.utc(now).add(0, 'minutes').toISOString();
const endTime = moment.utc(now).add(1, 'days').toISOString();

// specify the timezone, using standard IANA timezone format
const timezone = 'Europe/Madrid';

// request the timelines with all the query string parameters as options
const getTimelineParameters = queryString.stringify({
    apikey,
    location,
    fields,
    units,
    timesteps,
    startTime,
    endTime,
    timezone
}, { arrayFormat: 'comma' });
console.log(getTimelineURL + '?' + getTimelineParameters);

// GET request for remote image in node.js
axios({
    method: 'get',
    url: getTimelineURL + '?' + getTimelineParameters,
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
