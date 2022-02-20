// Update with your config settings.
const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    version: '12.9',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASS,
      database: process.env.DB
    },
    migrations: {
      directory: path.join(__dirname, '/knex/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/knex/seeds')
    }

  }
};
