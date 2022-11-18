/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("event_type", (table) => {
    table.dropUnique("event_type");
    table.unique(["event_type", "user_id"]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("event_type", (table) => {
    table.unique("event_type")
    table.dropUnique(["event_type", "user_id"]);
  })
};
