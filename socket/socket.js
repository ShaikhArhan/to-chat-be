const { Server } = require("socket.io");
const { updateChat, getOneToOneChat, updateOneMessageStatus, updateManyMessageStatus } = require("../controllers/chat/chat");
const { updateChatStatus } = require("../controllers/user/user");
const setupSocket = (server) => {
    const io = new Server(server, {
        // pingTimeout: 1000,
        cors: {
            origin: ["http://localhost:5173", "https://to-chat.netlify.app"],
        }
    });
    // Handle Socket.IO events
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("setup", async (userData) => {
            if (!userData?._id) return;
            socket.join(userData._id);

            await updateChatStatus({ id: userData._id, chatStatus: "online" });

            socket.emit("connected"); // Notify the user who connected
            io.emit("getUser"); // Broadcast getUser to all clients
        });

        socket.on("fetchOneToOneChat", async ({ userId, chatId }) => {
            if (userId || chatId) {
                const chat = await getOneToOneChat(userId, chatId)
                if (chat.success) {
                    io.to(userId).emit("getOneToOneChat", { chatData: chat })
                }
                else {
                    io.to(userId).emit("getOneToOneChat", { chatData: null })
                }
            }
        });

        socket.on("send message", async ({ chatId, user, newMessage }, callback) => {
            if (!chatId || !user) {
                console.error("Error: chatId or userId is missing");
                return;
            }
            const userId = user._id
            const sendMessage = await updateChat(userId, chatId + userId, newMessage);
            if (userId == chatId) {
                io.to(chatId).emit("receive message", { senderId: userId, chatId: userId + chatId, newMessage: { messageId: newMessage.messageId, text: newMessage.text, sender: "You", date: newMessage.date } });
            }
            else if (sendMessage.success) {
                callback({ success: true })
                // newMessage.sender = "received";
                const receivedMessage = await updateChat(chatId, userId + chatId, { messageId: newMessage.messageId, text: newMessage.text, sender: "received", date: newMessage.date });
                if (receivedMessage.success) {
                    const condition = {
                        "chat.messagesByDate.messages.messageId": newMessage.messageId
                    }
                    const statusChange = await updateOneMessageStatus(chatId + userId, condition, newMessage, { messageDelivered: { status: "delivered", date: new Date() } })
                    // console.log('statusChange: ', statusChange);
                    if (statusChange.success) {
                        io.to(userId).emit("messageStatusChanged", { userId, chatId: chatId + userId })
                    }
                    io.to(chatId).emit("messageNotification", { newMessage: newMessage, sender: user });
                    io.to(chatId).emit("receive message", { senderId: userId, chatId: userId + chatId, newMessage: { messageId: newMessage.messageId, text: newMessage.text, sender: "received", date: newMessage.date } });
                } else {
                    console.error("Error: -socket -receive message");
                }
            }
            else {
                console.error("Error: -socket -send message");
            }
        });

        socket.on("messageSeen", async ({ senderId, chatId }) => {
            const condition = {
                "chat.messagesByDate.messages.messageSeen.status": "unseen"
            }
            const statusChanged = await updateManyMessageStatus(senderId, chatId, condition, { messageSeen: { status: "seen", date: new Date() } })
            if (statusChanged.success) {
                io.to(senderId).emit("messageStatusChanged", { userId: senderId, chatId })
            }
        })

        socket.on("offline", async (userId) => {
            // console.log("Client disconnected:", socket.id);
            await updateChatStatus({ id: userId, chatStatus: "offline" });

            io.emit("getUser"); // Notify all clients when a user goes offline
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}
module.exports = setupSocket