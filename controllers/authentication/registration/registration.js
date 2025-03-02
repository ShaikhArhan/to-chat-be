const user = require("../../../model/user")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const data = await user.create({ name, email, password })
        if (data) {
            res.status(200).json({ data: data, message: "Successfully register", success: true })
        }
        else {
            res.status(400).json({ message: "Failed to register", success: false })
        }
    } catch (error) {
        res.json({ message: "Error in registration", success: false })
    }
}
module.exports = {
    register
}