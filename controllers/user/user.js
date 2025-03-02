const user = require("../../model/user")

const get = async (req, res) => {
    try {
        const data = await user.find().select("name chatStatus")
        if (data) {
            res.json({ data: data, message: "User fetched successfully", success: true })
        }
        else {
            res.json({ message: "Failed to fetch user", success: false })
        }
    } catch (error) {
        res.json({ message: "Error in fetching user", success: false })
    }
}

const updateChatStatus = async ({ id, chatStatus }) => {
    try {
        const data = await user.findByIdAndUpdate(id, { chatStatus: chatStatus }, { new: true })
        if (data) {
            return { data: data, message: "User update successfully", success: true }
        }
        else {
            return { message: "Failed to update user", success: false }
        }
    } catch (error) {
        return { message: "Error in updateing user", success: false }
    }
}

module.exports = {
    get,
    updateChatStatus
}