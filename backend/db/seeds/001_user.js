/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: "Din", last_name: "Djarin", email: "letMeSleep@mando.com", password:"123asd"},
    {first_name: "Mia", last_name: "Thermopolis", email: "aPrincessShutup@genovia.com", password:"1234"},
    // {first_name:, last_name:, email:, password:}
  ]);
};
