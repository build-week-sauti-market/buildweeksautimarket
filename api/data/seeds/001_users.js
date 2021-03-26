
exports.seed = function(knex) {
  return knex("users").insert([
    {id: 1, user_name: "Rafiullah",password: "abc123",location: "California"}
  ])
};