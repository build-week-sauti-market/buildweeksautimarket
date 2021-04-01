const router = require("express").Router()
const Market = require("./markets-model")

router.get("/market", async (req, res, next) => {
	try {
		const market = await Market.find()
		res.status(200).json(market)
	} catch (err) {
		next(err)
	}
})

router.get("/market", async (req, res, next) => {
	try {
		const market = await Market.findBy()
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
		if (!req.body.product_name || !req.body.category_name || !req.body.seller_price || !req.body.qty || !req.body.description || !req.body.seller_name || !req.body.location){
		return res.status(400).json({
		message: "Missing requied filed"
		})
		}
		const newItem = await Market.add(req.body)
		res.status(201).json(newItem)
	} catch (err) {
		next(err)
	}
})

router.put("/market/:id", async (req, res, next) => {
	try {
		const item = await Market.update(req.params.id, req.body)
		if (!item){
			return res.status(404).json({
				message: "not found"
			})
		}
		if (!req.body.product_name || !req.body.category_name || !req.body.seller_price || !req.body.qty || !req.body.description || !req.body.seller_name || !req.body.location){
			return res.status(400).json({
				message: "Missing required filed"
			})
		}
		res.status(200).json(item)
	} catch (err) {
		next(err)
	}
})

router.delete("/market/:id", async (req, res, next) => {
	try {
		const item = await Market.remove(req.params.id)
		if (!item){
			return res.status(404).json({
				message: "not found"
			})
		}
		res.status(200).json(item)
	} catch (err) {
		next(err)
	}
})

module.exports = router