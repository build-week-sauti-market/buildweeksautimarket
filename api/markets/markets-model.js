const db = require("../data/db-config")

function find(){
	return db("product_info as p_i")
		.join("products as p", "p.id", "p_i.product_id")
		.join("sellers as s", "s.id", "p_i.seller_id")
		.select("p.product_name", "p_i.seller_price", "p_i.qty", "p_i.description", "s.seller_name", "s.location")
}

function findBy(filter){
	return db("product_info as p_i")
		.join("products as p", "p.id", "p_i.product_id")
		.join("sellers as s", "s.id", "p_i.seller_id")
		.where(filter)
		.select("p.product_name", "p_i.seller_price", "p_i.qty", "p_i.description", "s.seller_name", "s.location")
}

function findById(id){
	console.log(id)
	return db("product_info as p_i,products as, sellers as s")
		.join("products as p", "p.id", "p_i.product_id")
		.join("sellers as s", "s.id", "p_i.seller_id")
		.where({ id })
		.select("p.product_name", "p_i.seller_price", "p_i.qty", "p_i.description", "s.seller_name", "s.location")
		.first()
}
async function add(item){
	const [id] = await db("product_info").insert(item).returning("id")
	return findById(id)
}

function update(id, changes){
	return db("product_info")
		.where({ id })
		.update(changes)
}

function remove(id){
	return db("product_info")
		.where({ id })
		.del()
}

module.exports = {
	find,
	findBy,
	findById,
	add,
	update,
	remove,
}

// function find(){
// 	return db("product_info")
// 		.select("*")
// }

// function findBy(filter){
// 	return db("product_info")
// 		.select("*")
// 		.where(filter)
// }

// function findById(id){
// 	return db("product_info")
// 		.select("*")
// 		.where({ id })
// 		.first()
// }

// async function add(item){
// 	const [id] = await db("product_info").insert(item).returning("id")
// 	return findById(id)
// }

// function update(id, changes){
// 	return db("product_info")
// 		.where({ id })
// 		.update(changes)
// }

// function remove(id){
// 	return db("product_info")
// 		.where({ id })
// 		.del()
// }

// module.exports = {
// 	find,
// 	findBy,
// 	findById,
// 	add,
// 	update,
// 	remove,
// }