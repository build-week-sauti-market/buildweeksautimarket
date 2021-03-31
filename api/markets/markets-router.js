const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Market = require("./markets-model")

router.get("/market", async (req, res, next) => {
	try {
		const market = await Market.find()
		res.status(200).json(market)
	} catch (err) {
		next(err)
	}
})

router.get("/market/:id", async (req, res, next) => {

	try {
		const item = await Market.findById(req.params.id)
		if (!item){
			return res.status(404).json({
				message: "No Item founded"
			})
		}
		res.status(200).json(item)
	} catch (err) {
		next(err)
	}
})

router.post("/market", async (req, res, next) => {
	try {
		const newItem = await Market.add(req.body)
		res.status(201).json(newItem)
	} catch (err) {
		next(err)
	}
})

router.put("/market/:id", async (req, res, next) => {
	try {
		const item = await Market.update(req.params.id, req.body)
		res.status(200).json(item)
	} catch (err) {
		next(err)
	}
})

router.delete("/market/:id", async (req, res, next) => {
	try {
		const item = await Market.remove(req.params.id)
		res.status(200).json(item)
	} catch (err) {
		next(err)
	}
})

module.exports = router