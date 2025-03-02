const express = require("express")
const route = express.Router()
const login = require("../../controllers/authentication/login/login");
route.post("/login",login.login)
module.exports = route