const express = require("express")
const router = express.Router()
const users = require("./user-model")
const plants = require("../plants/plants-model")
const {find} = require("../auth/auth-model")
const { checkUserID, validatePlant, ValidatePlantName, validatePlantID } = require("../middleware/api-middleware")
const bcrypt = require("bcryptjs")

router.get("/:id",checkUserID(), async(req, res, next) => {
try{
res.status(200).json(req.user)
}catch(err){
    next(err)
}
})
router.get("/", async(req, res, next) => {
    try{
const usersList = await find()
res.status(200).json(usersList)
    }catch(err){
        next(err)
    }
})
router.put("/:id", checkUserID(), async(req, res, next) => {
    try{
        const {password, phoneNumber} = req.body

            const updatedInfo = {
                password:await bcrypt.hash(password, 15),
                phoneNumber
            }
        if(!password || !phoneNumber){
            res.status(400).json({
                message: "password and phoneNumber are both required"
            })
        }
        const updated = await users.updateUser(updatedInfo, req.params.id)
res.status(200).json({
    message: "success updated info"
})
    }catch(err){

    }
})
router.post("/:id/plants", checkUserID(),validatePlant(),ValidatePlantName(), async (req, res, next) => {
    try{
const newPlant = req.body
    const plant = await plants.addPlant(newPlant, req.params.id)
     res.status(201).json(plant)

    }catch(err){
        next(err)
    }
})

router.get("/:id/plants", checkUserID(), async(req, res, next) => {
    try{
const plants = await users.findUserPlants(req.params.id)
if(plants.length > 0){
    res.status(200).json(plants)
}else{
    res.status(200).json({
        message: "this user has no plants. Go add some plants! :)"
    })
}

    }catch(err){
        next(err)
    }
})

module.exports = router