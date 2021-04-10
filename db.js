//set a configuration for what or where we want to connect that database
const pg = require("pg").Pool;

const pool = new pg({
    user: 'postgres',
    password: 'password',
    database:'todo_database',
    host:'localhost',
    port: 5432
});

module.exports = pool;