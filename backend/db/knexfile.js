require("dotenv").config({
  path: __dirname+"/../../.env.local",
});
// console.log("dr",__dirname+"./migrations")
///Users/yoonjukim/Downloads/CC/logs-on-the-internet/backend/db/migrations
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME || "calendar",
      user:     process.env.DB_USER || "yoonjukim",
      password: process.env.DB_PASSWORD || "2wsx"
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }

};
