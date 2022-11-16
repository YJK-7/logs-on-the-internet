/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event').del();
  await knex('event').insert([
    {date:"Mon Nov 07 2022", event_content:"Coding", event_type_id:1, user_id:1},
    {date:"Mon Nov 07 2022", event_content:"Gym", event_type_id:2, user_id:1},
    {date:"Mon Nov 07 2022", event_content:"BH Work", event_type_id:3, user_id:1},
    {date:"Wed Nov 09 2022", event_content:"Gym", event_type_id:2, user_id:2},
    {date:"Sun Nov 13 2022", event_content:"Tutoring", event_type_id:3, user_id:1}
  ]);
};
