// Update with your config settings.
const path = require('path');
/**
 * @type {string|string}
 */

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

module.exports = {

    development: {
        client: 'pg',
        version: '12.8',
        connection: {
            // host: process.env.HOST,
            // port: process.env.DB_PORT,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DB,
            host: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,

        },
        migrations: {
            directory: path.join(__dirname, '/knex/migrations')
        },
        seeds: {
            directory: path.join(__dirname, '/knex/seeds')
        }

    }
};
