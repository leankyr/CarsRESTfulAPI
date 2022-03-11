const queryString = require('query-string');
const moment = require('moment');

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

module.exports = {
    getTimelineURL,
    getTimelineParameters
}