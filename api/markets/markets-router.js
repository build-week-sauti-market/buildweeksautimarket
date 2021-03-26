const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Market = require("../auth/auth-model")

router.get("/market", async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
})

router.get("/market/:id", async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
})

router.post("/market", async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
})

router.put("/market/:id", async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
})

router.delete("/market/:id", async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
})

module.exports = router