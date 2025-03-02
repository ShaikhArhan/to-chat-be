const user = require("../../../model/user")

const login = async (req, res) => {
    const { email, password } = req.body     
    try {
        const data = await user.findOne({ email })
        if (data) {
            if (data.password == password) {
                res.json({ data: data, message: "Login Success", success: true })
            }
            else {
                res.json({ message: "Invalid credentials", success: false })
            }
        }
        else {
            res.status(400).json({ message: "Not register", success: false })
        }
    } catch (error) {
        res.json({ message: "Error in login", success: false })
    }
}
module.exports = {
    login
}