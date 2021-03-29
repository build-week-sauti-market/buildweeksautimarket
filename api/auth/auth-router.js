const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Auth = require("./auth-model")

router.post("/register", async (req, res, next) => {
	try {
		const { user_name, password } = req.body

		if(!user_name || !password){
			return res.status(400).json({
				message: "user_name and password required"
			})
		} else {
			const  hashpass = await bcrypt.hash(password, 5)
			const newUser = await Auth.add({
				user_name: user_name,
				password: hashpass

			})
			res.status(201).json(newUser)
		}
	} catch (err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { user_name, password } = req.body
		console.log(req.body)
		if(!user_name || !password){
			return res.status(400).json({
				message: "user_name and password required"
			})
		}
		const user = await Auth.findBy({ user_name }).first()
		console.log(user)
		const checkPassword = await bcrypt.compare(password,user.password)
		console.log(checkPassword)

		if (!user){
			return res.status(401).json({
				message: "user_name or password incorrect"
			})
		} else {
			const token = jwt.sign({
				subject: user.id,
				user_name: user.user_name
			}, "keep it secret keep it safe", {expiresIn: "1d"})
			
			res.cookie("token", token)

			res.status(200).json({
				message: `Welcome back ${user_name}!`,
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