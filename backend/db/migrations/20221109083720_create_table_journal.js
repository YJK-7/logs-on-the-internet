/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("journal", function (table) {
      table.primary(["date", "user_id"]);
      table.date("test");
      table.string("date", 32)
        .notNullable();
      table.string("content", 255);
      table.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("user")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("journal");
};
