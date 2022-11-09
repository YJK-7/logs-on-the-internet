const knex = require("knex");
const knexConfig = require("./db/knexfile")
require('dotenv').config({path:__dirname+"/../.env.local"})

const environment = process.env.NODE_ENV;
console.log(knexConfig[environment])

module.exports = knex(knexConfig[environment]);