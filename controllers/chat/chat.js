// const chat = require("../../model/chat")

// const createNewChat = async () => {

// }

// const createChatByDate = async () => {
//     try {
//         const data = await chat.create()
//     } catch (error) {
//         console.log('error: ', error);
//         return error
//     }
// }
// const updateChat = async (chatId, newMessage) => {
//     try {
//         const chatData = await chat.findOne({ chatId: chatId })
//         const todayDate = new Date().toLocaleDateString()
//         if (chatData) {
//             const todayChat = chatData?.messagesByDate?.filter(data => data.date === todayDate)[0]
//             console.log('updateChat -todayChat: ', todayChat);
//             if (todayChat) {
//                 chatData.messagesByDate.message.push(newMessage)

//             } else {
//                 chatData.messagesByDate.push({
//                     date:todayDate,
//                     message: [newMessage]
//                 })
//             }
//             await chatData.save()
//         } else {
//             createNewChat()
//         }

//     } catch (error) {
//         console.log('error: ', error);
//         return res.json({ message: "error ,in updating chat", success: false })
//     }
// }

// const get = async (chatId) => {
//     // const { chatId } = req.body;
//     try {
//         if (!chatId) {
//             return res.status(400).json({ message: "chatId is required", success: false });
//         }
//         const data = await chat.findOne({ chatId: chatId })
//         if (data) {
//             return res.json({ data: data, message: "chats fetched successfully", success: true })
//         } else {
//             return res.json({ message: "no chats found", success: false })
//         }
//     } catch (error) {
//         return res.json({ message: "error ,in fetching chat", success: false })
//     }
// }

// module.exports = {
//     get
// }


/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// const chat = require("../../model/chat");

// const createNewChat = async (chatId, message) => {
//     console.log("6.1");
//     try {
//         const newChat = await chat.create({
//             chatId: chatId,
//             messagesByDate: [{
//                 date: new Date().toLocaleDateString(),
//                 message: [message]
//             }]
//         });
//         // return newChat;
//         console.log("6.2");
//         if (newChat) {
//             console.log("6.3");
//             return { message: "Chat created successfully", success: true, chat: newChat };
//         }
//         else {
//             console.log("6.4");
//             return { message: "Error in creating chat", success: false }
//         }

//     } catch (error) {
//         console.log("6.5");
//         console.log('error: ', error);
//         return error;
//     }
// };

// const updateChat = async (chatId, message) => {
//     // console.log('chatId, message: ', chatId, message);
//     console.log("1");
//     try {
//         const todayDate = new Date().toLocaleDateString();
//         console.log("2");
//         // Try updating an existing date entry using $push
//         const updatedChat = await chat.findOneAndUpdate(
//             { chatId: chatId, "messagesByDate.date": todayDate },
//             { $push: { "messagesByDate.$.message": message } },
//             { new: true }
//         );

//         if (updatedChat) {
//             console.log("3");
//             return { message: "Chat updated successfully", success: true, chat: updatedChat };
//         } else {
//             console.log("4");
//             // If no document was found with today's date, add a new date entry
//             const chatData = await chat.findOneAndUpdate(
//                 { chatId: chatId },
//                 {
//                     $push: { messagesByDate: { date: todayDate, message: [message] } }
//                 },
//                 { new: true }
//             );

//             if (chatData) {
//                 console.log("5");
//                 return { message: "Chat updated successfully", success: true, chat: chatData };
//             } else {
//                 console.log("6");
//                 // If chatId doesn't exist, create a new chat
//                 return await createNewChat(chatId, message);
//             }
//         }
//     } catch (error) {
//         console.log("7");
//         console.log('error:', error);
//         return { message: "Error in updating chat", success: false };
//     }
// };

// const getChat = async (chatId) => {
//     try {
//         if (!chatId) {
//             return { message: "chatId is required", success: false };
//         }
//         const data = await chat.findOne({ chatId: chatId });
//         if (data) {
//             return { data: data, message: "Chats fetched successfully", success: true };
//         } else {
//             return { message: "No chats found", success: false };
//         }
//     } catch (error) {
//         return { message: "Error in fetching chat", success: false };
//     }
// };

// module.exports = {
//     getChat,
//     updateChat
// };


// const chat = require("../../model/chat");

// const createNewChat = async (chatId, message) => {
//     console.log("6.1");
//     try {
//         const newChat = await chat.create({
//             chatId: chatId,
//             messagesByDate: [{
//                 date: new Date().toLocaleDateString(),
//                 message: [message]
//             }]
//         });
//         // return newChat;
//         console.log("6.2");
//         if (newChat) {
//             console.log("6.3");
//             return { message: "Chat created successfully", success: true, chat: newChat };
//         }
//         else {
//             console.log("6.4");
//             return { message: "Error in creating chat", success: false }
//         }

//     } catch (error) {
//         console.log("6.5");
//         console.log('error: ', error);
//         return error;
//     }
// };

// const updateChat = async (userId, chatId, message) => {
//     try {
//         const todayDate = new Date().toLocaleDateString();

//         // Try updating an existing date entry using $push
//         const updatedChat = await chat.findOneAndUpdate(
//             { userId: userId, chatId: chatId, "messagesByDate.date": todayDate },
//             { $push: { "messagesByDate.$.message": message } },
//             { new: true }
//         );

//         if (updatedChat) {
//             return { message: "Chat updated successfully", success: true, chat: updatedChat };
//         } 
//         else {
//             // If no document was found with today's date, add a new date entry
//             const chatData = await chat.findOneAndUpdate(
//                 {userId:userId, chatId: chatId },
//                 {
//                     $push: { messagesByDate: { date: todayDate, message: [message] } }
//                 },
//                 { new: true }
//             );

//             if (chatData) {
//                 return { message: "Chat updated successfully", success: true, chat: chatData };
//             } else {
//                 // If chatId doesn't exist, create a new chat
//                 return await createNewChat(chatId, message);
//             }
//         }
//     } catch (error) {
//         console.log('error:', error);
//         return { message: "Error in updating chat", success: false };
//     }
// };

// const getChat = async (chatId) => {
//     try {
//         if (!chatId) {
//             return { message: "chatId is required", success: false };
//         }
//         const data = await chat.findOne({ chatId: chatId });
//         if (data) {
//             return { data: data, message: "Chats fetched successfully", success: true };
//         } else {
//             return { message: "No chats found", success: false };
//         }
//     } catch (error) {
//         return { message: "Error in fetching chat", success: false };
//     }
// };

// module.exports = {
//     getChat,
//     updateChat
// };



const chatModel = require("../../model/chat");

//  Create a new chat or add a message if chatId exists
const createNewChat = async (userId, chatId, message) => {
    try {
        const todayDate = new Date().toLocaleDateString();

        let userChat = await chatModel.findOne({ userId });

        if (!userChat) {
            // If user doesn't have a chat document, create one
            userChat = await chatModel.create({
                userId,
                chat: [{
                    chatId: chatId,
                    messagesByDate: [{ date: todayDate, messages: [message] }]
                }]
            });
        } else {
            // Check if chatId exists
            const chatIndex = userChat.chat.findIndex(c => c.chatId === chatId);

            if (chatIndex === -1) {
                // If chatId doesn't exist, add a new chat
                userChat.chat.push({
                    chatId,
                    messagesByDate: [{ date: todayDate, messages: [message] }]
                });
            } else {
                // If chatId exists, check if today's date exists
                const dateIndex = userChat.chat[chatIndex].messagesByDate.findIndex(d => d.date === todayDate);

                if (dateIndex === -1) {
                    // If date doesn't exist, add a new date entry
                    userChat.chat[chatIndex].messagesByDate.push({ date: todayDate, messages: [message] });
                } else {
                    // If today's date exists, add message to the messages array
                    userChat.chat[chatIndex].messagesByDate[dateIndex].messages.push(message);
                }
            }
        }

        await userChat.save();
        return { message: "Chat created/updated successfully", success: true, chat: userChat };
    } catch (error) {
        console.log('error:', error);
        return { message: "Error in creating chat", success: false };
    }
};

//  Update an existing chat (only adds messages)
const updateChat = async (userId, chatId, message) => {
    try {
        if (!chatId) {
            console.error("Error: chatId is null or undefined");
            return { message: "Invalid chatId", success: false };
        }
        // 26/2/2025
        const todayDate = new Date().toLocaleDateString();
        // const todayDate = "27/2/2025";

        let updatedChat = await chatModel.findOneAndUpdate(
            { userId, "chat.chatId": chatId, "chat.messagesByDate.date": todayDate },
            { $push: { "chat.$[i].messagesByDate.$[j].messages": message } },
            {
                new: true, arrayFilters: [{ "i.chatId": chatId }, { "j.date": todayDate }]
            }
        );

        if (!updatedChat) {
            updatedChat = await chatModel.findOneAndUpdate(
                { userId, "chat.chatId": chatId },
                { $push: { "chat.$.messagesByDate": { date: todayDate, messages: [message] } } },
                { new: true }
            );
        }

        if (!updatedChat) {
            return await createNewChat(userId, chatId, message);
        }

        return { message: "Chat updated successfully", success: true, chat: updatedChat };
    } catch (error) {
        console.log("Error:", error);
        return { message: "Error in updating chat", success: false };
    }
};

//  Fetch chat messages by chatId
const getOneToOneChat = async (userId, chatId) => {
    try {
        if (!userId || !chatId) {
            return { message: "userId and chatId are required", success: false };
        }

        // console.log("Fetching chat for:", userId, chatId);

        const userChat = await chatModel.findOne(
            { userId, "chat.chatId": chatId },
            { chat: { $elemMatch: { chatId } } }
        );

        if (userChat) {
            // console.log("Chat found: ", JSON.stringify(userChat, null, 2));
            return { data: userChat, message: "Chat fetched successfully", success: true };
        } else {
            // console.log("No chat found");
            return { message: "No chat found", success: false };
        }
    } catch (error) {
        console.error("Error in fetching chat", error);
        return { message: "Error in fetching chat", success: false };
    }
};

const updateOneMessageStatus = async (chatId, condition, message, data) => {
    // console.log('chatId, message, data: ', chatId, message, data);
    try {
        let updateFields = {};
        for (let key in data) {
            updateFields[`chat.$[chatElem].messagesByDate.$[dateElem].messages.$[msgElem].${key}`] = data[key];
        }

        const updatedMessage = await chatModel.findOneAndUpdate(
            {
                "chat.chatId": chatId,
                ...condition
            },
            { $set: updateFields },
            {
                arrayFilters: [
                    { "chatElem.chatId": chatId },
                    { "dateElem.date": new Date(message.date).toLocaleDateString() },
                    { "msgElem.messageId": message.messageId }
                ],
                new: true
            }
        );

        if (!updatedMessage) {
            return { message: "message not found", success: false }
        }
        // console.log('updatedMessage: ', updatedMessage);
        return { message: "message updated successfully", success: true }
    } catch (error) {
        console.error("Error in updating message", error);
        return { message: "Error in updating message", success: false };
    }
}
// updateMany
const updateManyMessageStatus = async (userId, chatId, condition = {}, data) => {
    // console.log('updateManyMessageStatus -userId, chatId,: ', userId, chatId,);
    try {
        let updateFields = {};
        for (let key in data) {
            updateFields[`chat.$[chatElem].messagesByDate.$[].messages.$[].${key}`] = data[key];
        }

        const updatedResult = await chatModel.updateMany(
            {
                userId: userId,
                "chat.chatId": chatId,
                ...condition
            },
            { $set: updateFields },
            {
                arrayFilters: [
                    { "chatElem.chatId": chatId }
                ]
            }
        );

        if (updatedResult.modifiedCount === 0) {
            return { message: "No messages updated", success: false };
        }
        return { message: "Messages updated successfully", success: true };
    } catch (error) {
        console.error("Error in updating messages", error);
        return { message: "Error in updating messages", success: false };
    }
};

// const countUnseenMessage = async (req, res) => {
//     const { senderId, chatId } = req.body
//     console.log('countUnseenMessage -senderId, chatId: ', senderId, chatId);
//     try {
//         if (!senderId || !chatId) {
//             return { message: "senderId and chatId are required", success: false };
//         }
//         const unseenMessage = await chatModel.find({ userId: senderId, "chat.chatId": chatId, "chat.messagesByDate.messages.messageSeen.status": "unseen" })
//         console.log('unseenMessage: ', unseenMessage);
//         if (!unseenMessage) {
//             return res.json({ message: "Failed to fetch unseen messages", success: false })
//         }
//         return res.json({ data: unseenMessage, message: "Fetch unseen messages successfuly", success: true })
//     } catch (error) {
//         return res.json({ message: "Error in fetching unseen messages", success: false })
//     }
// }
const countUnseenMessage = async (req, res) => {
    const { senderId, chatId } = req.body;
    // console.log('countUnseenMessage - senderId, chatId:', senderId, chatId);
    try {
        if (!senderId || !chatId) {
            return res.json({ message: "senderId and chatId are required", success: false });
        }

        const unseenMessage = await chatModel.aggregate([
            {
                $match: {
                    userId: senderId,
                    "chat.chatId": chatId
                }
            },
            { $unwind: "$chat" },
            { $match: { "chat.chatId": chatId } },
            { $unwind: "$chat.messagesByDate" },
            { $unwind: "$chat.messagesByDate.messages" },
            {
                $match: {
                    "chat.messagesByDate.messages.messageSeen.status": "unseen"
                }
            },
            {
                $project: {
                    _id: 0,
                    unseenMessages: "$chat.messagesByDate.messages"
                }
            }
        ]);
        // console.log('unseenMessage:', unseenMessage);

        if (!unseenMessage || unseenMessage.length === 0) {
            return res.json({ message: "No unseen messages found", success: false });
        }

        return res.json({ data: unseenMessage, message: "Fetched unseen messages successfully", success: true });

    } catch (error) {
        console.error("Error fetching unseen messages:", error);
        return res.json({ message: "Error in fetching unseen messages", success: false });
    }
};

//  Export functions
module.exports = {
    createNewChat,
    updateChat,
    getOneToOneChat,
    updateOneMessageStatus,
    updateManyMessageStatus,
    countUnseenMessage
};
