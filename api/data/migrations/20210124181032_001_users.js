exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
      table.increments()
      table.text("user_name")
        .notNullable()
      table.text("password")
        .notNullable()
      table.text("location")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
  
};
