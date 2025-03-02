const express = require("express")
const route = express.Router()
const registration = require("../../controllers/authentication/registration/registration");
route.post("/register",registration.register)
module.exports = route