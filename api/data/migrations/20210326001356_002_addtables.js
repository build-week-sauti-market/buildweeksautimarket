exports.up = function(knex) {
  return knex.schema.createTable("sellers", table => {
     table.increments()
     table.text("seller_name")
        .notNullable()
    table.text("location")
        .notNullable()
    table.text("photo") 
  })

  .createTable("category", table => {
      table.increments()
      table.text("category_name")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTabelIfExists("category")
    .dropTableIfExists("sellers")
};