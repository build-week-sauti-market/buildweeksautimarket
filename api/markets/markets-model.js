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
	return db("product_info as p_i")
		.join("products as p", "p.id","=", "p_i.product_id")
		.join("sellers as s", "s.id", "=", "p_i.seller_id")
		.where("p_i.id",id)
		.select("p.product_name", "p_i.seller_price", "p_i.qty", "p_i.description", "s.seller_name", "s.location")
		.first()
}
function findSellerByName(seller_name){
	return db("sellers")
		.where({seller_name})
		.first()
}

function findProductByName(product_name){
	return db("products")
		.where({product_name})
}

function findCategoryByName(category_name){
	return db("category")
		.where({category_name})
}

async function add(item){
	const seller = await findSellerByName(item.seller_name)
	const categoryArr = await findCategoryByName(item.category_name)
	const productArr = await findProductByName(item.product_name)
	let categoryId
	if (categoryArr.length < 1){
	[categoryId] = await db("category").insert(category_name)
	} else {
		categoryId = categoryArr[0].id
	}
	let productId
	if (productArr.length < 1){
		console.log("product name", item.product_name)
		console.log(categoryId)
		[productId] = await db("products").insert({product_name: item.product_name, category_id: categoryId})
	} else {
		productId = productArr[0].id
	}
	const itemToAdd = {
		product_id: productId,
		seller_id: seller.id,
		seller_price: item.seller_price,
		qty: item.qty,
		description: item.description
	}

	const [addedItem] = await db("product_info").insert(itemToAdd).returning("id")
	return findById(addedItem)
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
	findSellerByName,
	add,
	update,
	remove,
}