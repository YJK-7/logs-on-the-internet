require("dotenv").config({
  path: __dirname+"/../../.env.local",
});

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
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
