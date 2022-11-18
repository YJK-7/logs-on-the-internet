/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event_type').del();
  await knex('event_type').insert([
    {event_type:"study", hex_code:"#7dae9b", user_id:1},
    {event_type:"leisure", hex_code:"#8abfe8", user_id:1},
    {event_type:"work", hex_code:"#7b78b8", user_id:1},
    {event_type:"study", hex_code:"#7dae9b", user_id:2},
    {event_type:"leisure", hex_code:"#8abfe8", user_id:2},
    {event_type:"work", hex_code:"#7b78b8", user_id:2}
  ]); 
};
