
const db = require("../data/db-config")

function getUserByID(id) {
    return db("users").where("id",id).first() 
}

async function updateUser(changes, id) {
    await db("users").where("id", id).update(changes)
    return getUserByID(id)
}

function removeUser(id){
    return db("users").where("id", id).del()
}


function findUserPlants(UserId){
    return db("plants as p").where("p.user_id", UserId)
            .join("users as u", "p.user_id", "u.id")
            .select("p.id", "p.user_id as UserID", "p.nickname", "p.water", "p.H2OFrequency", "p.species", "p.image")
            
}


module.exports = {
    updateUser,
    getUserByID,
    removeUser,
    findUserPlants,
    
}