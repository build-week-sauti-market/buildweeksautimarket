const db = require("../data/db-config")

function find(){
	return db("product_info")
		.select("*")
}

function findBy(filter){
	return db("product_info")
		.select("*")
		.where(filter)
}

function findById(id){
	return db("product_info")
		.select("*")
		.where({ id })
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