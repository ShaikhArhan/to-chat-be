const mongoose = require("mongoose")
const Schema = mongoose.Schema
const todoSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: function () {
            return this._id;
        },
        unique: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    checked: {
        type: Boolean,
        default: false,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("todolist", todoSchema)