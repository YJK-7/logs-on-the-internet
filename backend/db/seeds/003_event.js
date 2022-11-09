/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event').del();
  await knex('event').insert([
    {id:1, date:"Mon Nov 07 2022", test:"2022-11-07", event_content:"Coding", event_type_id:1, user_id:1},
    {id:2, date:"Mon Nov 07 2022", test:"2022-11-07", event_content:"Gym", event_type_id:2, user_id:1},
    {id:3, date:"Mon Nov 07 2022", test:"2022-11-07", event_content:"BH Work", event_type_id:3, user_id:1},
    {id:4, date:"Wed Nov 09 2022", test:"2022-11-09", event_content:"Gym", event_type_id:2, user_id:2},
    {id:5, date:"Sun Nov 13 2022", test:"2022-11-13", event_content:"Tutoring", event_type_id:3, user_id:1}
  ]);
};
