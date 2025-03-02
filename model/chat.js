// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const chatSchema = new Schema({
//     chatId: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     messagesByDate: [
//         {
//             date: {
//                 type: String,
//             },
//             message: {
//                 type: Array,
//                 default: [],
//             }
//         }
//     ]
// });

// module.exports = mongoose.model("chat", chatSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    userId: {
        type: String,  
        required: true,        
    },
    chat: [
        {
            chatId: {
                type: String,
                required: true,                
            },            
            messagesByDate: [
                {
                    date: {
                        type: String,
                        required: true
                    },
                    messages: {
                        type: Array,
                        default: [],
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model("chat", chatSchema);
