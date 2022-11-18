/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//limit to 3 types of events: study, leisure, work

exports.up = function(knex) {
  return knex.schema
    .createTable("event_type", function (table) {
      table.increments("id")
        .primary();
      table.string("event_type", 32)
        .notNullable()
        .unique();
      table.string("hex_code",7)
        .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("event_type");
};
