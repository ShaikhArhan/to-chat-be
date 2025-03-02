const mongoose = require("mongoose")
const chat = require("./chat")
const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chatStatus:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("user", userSchema)