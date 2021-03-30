exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
      table.increments("id")
      table.text("product_name")
      table.integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("category")
  })

  .createTable("product_info", table => {
      table.increments("id")
      table.integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
      table.integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers")
      table.float("seller_price")
        .notNullable()
      table.integer("qty")
        .unsigned()
        .notNullable()
      table.text("description")
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("product_info")
    .dropTableIfExists("products")
};