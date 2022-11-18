/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("event_type", (table) => {
    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("user");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("event_type", (table) => {
    table.dropColumn("user_id");
  })
};
