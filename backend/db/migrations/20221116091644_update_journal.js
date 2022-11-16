/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("journal", (table) => {
    table.integer("image_id")
        .references("id")
        .inTable("image")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("journal", (table) => {
    table.dropColumn("image_id")
  })
};
