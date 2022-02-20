export const knex = require('knex')({
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
