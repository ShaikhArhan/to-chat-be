const express = require("express")
const route = express.Router()
const user = require("../controllers/user/user");
route.get("/get", user.get)
// route.patch("/updateChatStatus", user.updateChatStatus)
module.exports = route