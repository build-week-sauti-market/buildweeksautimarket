const db = require("../data/db-config")

async function add(user) {
    const [id] = await db("users").insert(user)
return findById(id)
}

function find() {
    return db("users").select("id","username", "password", "phoneNumber")
}

function findById(id) {
    return db("users").where("id", id).first("id", "username", "password", "phoneNumber")
}

function findByUsername(username) {
    return db("users").where("username", username).first("id", "username", "password", "phoneNumber")
}
function findByPhoneNumber(phoneNumber){
    return db("users").where("phoneNumber", phoneNumber).first("id", "phoneNumber", "username")
    return db("users").where("username", username).first("id", "username", "password", "phoneNumber")
}
module.exports = {
    find,
    findById,
    findByUsername,
    add,
    findByPhoneNumber
}