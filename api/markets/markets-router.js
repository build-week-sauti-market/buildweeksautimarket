const express = require("express")
const router = express.Router()
const plants = require("./plants-model")
const {validatePlantID, validatePlant} = require("../middleware/api-middleware")

router.put("/:id",validatePlantID(),validatePlant(), async(req, res, next) => {
    try{
        
        const updatedPlant = await plants.updatePlant(req.body, req.params.id)
res.status(200).json(updatedPlant)
    }catch(err){
        next(err)
    }
})
router.delete("/:id",validatePlantID(), async(req, res, next) => {
    try{
await plants.removePlant(req.plant.id)
res.status(204).json({
    message: "plant was deleted"
})
    }catch(err){
        next(err)
    }
})
router.get("/:id", validatePlantID(), async(req, res, next) => {
    try{
res.status(200).json(req.plant)
    }catch(err){
        next(err)
    }
})
module.exports = router