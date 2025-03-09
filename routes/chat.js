const express = require("express")
const router = express.Router()
const chat = require("../controllers/chat/chat")
router.post("/get",chat.countUnseenMessage)
module.exports = router