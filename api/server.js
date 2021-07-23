const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const restricted = require("./middleware/restricted")

const welcomeRouter = require ("./welcome-router")
// const usersRouter = require("./user/user-router")


const authRouter = require("./auth/auth-router")
const itemsRouter = require("./items/items-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use("/",welcomeRouter)
// server.use('/api/users',usersRouter)

server.use('/api/auth', authRouter)
server.use('/api/items',restricted, itemsRouter)
server.get("/",(req, res) =>{
    res.json({api:"up"})
})

// server.use((err, req, res, next) => {
// 	res.status(500).json({
// 		message: err.message,
// 		stack: err.stack
// 	})
// })
module.exports = server;