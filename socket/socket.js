const { Server } = require("socket.io");
const { updateChat, getOneToOneChat } = require("../controllers/chat/chat");
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

        socket.on("send message", async ({ chatId, userId, newMessage }, callback) => {
            if (!chatId || !userId) {
                console.error("Error: chatId or userId is missing");
                return;
            }
            const sendMessage = await updateChat(userId, chatId + userId, newMessage);
            if (sendMessage.success) {
                callback({ success: true })
                newMessage.sender = "received";
                const receivedMessage = await updateChat(chatId, userId + chatId, newMessage);
                if (receivedMessage.success) {
                    io.to(chatId).emit("receive message", { chatId: userId + chatId, newMessage: newMessage });
                } else {
                    console.error("Error: -socket -receive message");
                }
            } else {
                console.error("Error: -socket -send message");
            }
        });

        socket.on("offline", async (userId) => {
            console.log("Client disconnected:", socket.id);
            await updateChatStatus({ id: userId, chatStatus: "offline" });
        
            io.emit("getUser"); // Notify all clients when a user goes offline
        });        

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}
module.exports = setupSocket