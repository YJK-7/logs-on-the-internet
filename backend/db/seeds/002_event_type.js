/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event_type').del();
  await knex('event_type').insert([
    {id:1, event_type:"study"},
    {id:2, event_type:"leisure"},
    {id:3, event_type:"work"}
  ]); 
};
