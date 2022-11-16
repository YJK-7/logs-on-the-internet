/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("image", function (table) {
      table.increments("id")
        .primary();
      table.string("asset_id")
        .unique()
        .notNullable();
      table.string("public_id")
        .notNullable();
      table.string("signature")
        .notNullable();
      table.string("secure_url")
        .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("image");
};
