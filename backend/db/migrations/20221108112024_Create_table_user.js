/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("user", function (table) {
      table.increments("id").unsigned().primary();
      table.string("first_name", 32)
        .notNullable();
      table.string("last_name", 32)
        .notNullable();
      table
        .string("email", 32)
        .unique()
        .notNullable();;
      table.string("password", 32);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
