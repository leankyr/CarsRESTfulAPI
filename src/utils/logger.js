const bunyan = require('bunyan');
const log = bunyan.createLogger({
    name: 'app',
    level: 'debug',
    stream: process.stdout
});

module.exports = { log };
