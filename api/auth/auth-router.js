const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Auth = require("./auth-model")

router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body

		if(!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		} else {
			const newUser = await Auth.add({
				username: username,
				password: await bcrypt.hash(password, 5)
			})
			res.status(201).json(newUser)
		}
	} catch (err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		if(!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		}
		const user = await Auth.findBy({ username }).first()
		const checkPassword = await bcrypt.compare(password, user ? user.password : "")

		if (!user || !checkPassword){
			return res.status(401).json({
				message: "username or password incorrect"
			})
		} else {
			const token = jwt.sign({
				subject: user.id,
				username: user.username
			}, "keep it secret keep it safe", {expiresIn: "1d"})
			
			res.cookie("token", token)

			res.status(200).json({
				message: `Welcome back ${username}!`,
				token: token
			})
		}
		
	} catch (err) {
		next(err)
	}
})

router.post("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err){
				next(err)
			} else {
				res.status(204).end()
			}
		})
		
	} catch (err) {
		next(err)
	}
})

module.exports = router