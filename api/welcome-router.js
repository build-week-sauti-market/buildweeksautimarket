const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        Message: "Welcome to sauti-market API Lambda Team# 86"
    })
})
module.exports = router