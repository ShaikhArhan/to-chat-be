const express = require("express")
const route = express.Router()
const todo = require("../controllers/todo/todo")

route.post("/add", todo.add)
route.post("/get", todo.get)
route.post("/getByMessage", todo.getByMessage)
route.put("/edit/:id", todo.edit)
route.delete("/delete/:id", todo.deleted)

module.exports = route