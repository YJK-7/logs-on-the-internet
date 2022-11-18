/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema
    .createTable("event", function (table) {
      table.increments("id")
        .unsigned()
        .primary();
      table.string("date", 32)
        .notNullable();
      table.date("test");
      table.string("event_content", 32)
        .notNullable();
        
      table.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("user");
      table.integer("event_type_id")
        .notNullable()
        .references("id")
        .inTable("event_type"); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("event");
};
