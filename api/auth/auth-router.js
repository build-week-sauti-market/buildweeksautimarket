const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Auth = require("./auth-model")

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, email, isOwner } = req.body

		if(!username || !password || !email || !isOwner) {
			return res.status(400).json({
				message: "username, password, and email, member status required"
			})
		} else {
			const  hashpass = await bcrypt.hash(password, 5)
			const newUser = await Auth.add({
				username: username,
				password: hashpass,
				email: email,
				isOwner: isOwner

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
		console.log(req.body)
		if(!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		}
		const user = await Auth.findBy({ username }).first()
		console.log("login",user)
		const checkPassword = await bcrypt.compare(password,user.password)
		console.log(checkPassword)

		if (!user){
			return res.status(401).json({
				message: "username or password incorrect"
			})
		} else {
			const token = jwt.sign({
				subject: user.id,
				username: user.username
			}, process.env.JWT_SECRET, {expiresIn: "1d"})
			
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