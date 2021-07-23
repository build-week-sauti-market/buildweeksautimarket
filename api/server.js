const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const restricted = require("./middleware/restricted")

const welcomeRouter = require ("./welcome-router")

const authRouter = require("./auth/auth-router")
const itemsRouter = require("./items/items-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use("/",welcomeRouter)
server.use('/api/auth', authRouter)
server.use('/api/items',restricted, itemsRouter)


server.get("/",(req, res) =>{
    res.json({api:"up"})
})
module.exports = server;