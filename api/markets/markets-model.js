const db = require("../data/db-config")


function findUserItems(UserId){
    return db("plants as p").where("p.user_id", UserId)
            .join("users as u", "p.user_id", "u.id")
            .select("p.id", "p.user_id as UserID", "p.nickname", "p.water", "p.H2OFrequency", "p.species", "p.image")         
}
async function removeItems(ItemId){
    return db("plants").where("id",ItemId).del()
    // return findUserItems(userID)
}

async function updatePlant(changes,ItemId){
    await db("plants").where("id",ItemId).update(changes)
    return findByID(ItemId)
}

function findByID(id) {
    return db("plants").where("id", id).first("id", "user_id as UserID", "nickname", "water", "H2OFrequency", "species", "image")
}



async function addItem(item, userID) {
    const [plantID] = await db("plants as p").insert(item).where("p.user_id", userID)
             
     return findUserItems(userID)
 }

function findItemByNickname(name) {
     return db("items").where("nickname", name).first("id", "nickname")
 }
module.exports = {
    removeItems,
    updatePlant,
    findByID,
    addItem,
    findItemByNickname,
    findUserItems
}
