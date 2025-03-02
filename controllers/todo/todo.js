const todo = require("../../model/todo")

const add = async (req, res) => {
    try {
        if (req.body) {
            // console.log('req.body: ', req.body);
            const data = await todo.create(req.body)
            if (data) {
                res.json({ data: data, message: "Todo added successfully", success: true })
            }
            else {
                res.json({ message: "Failed to add Todo", success: false })
            }
        }
    } catch (error) {
        res.json({ message: "Error in adding Todo", success: false })
    }
}
const get = async (req, res) => {
    const { userId } = req.body
    try {
        const data = await todo.find({userId:userId})
        if (data) {
            res.json({ data: data, message: "Todos fetched successfully", success: true })
        }
        else {
            res.json({ message: "Failed to fetch Todos", success: false })
        }
    } catch (error) {
        res.json({ message: "Error in fetching Todos", success: false })
    }

}

const getByMessage = async (req, res) => {    
    const { message } = req.body    
    try {
        const data = await todo.find({ message: { $regex: message, $options: "i" } })
        if (data) {
            res.json({ data: data, message: "Todos fetched successfully", success: true })
        }
        else {
            res.json({ message: "Failed to fetch Todos", success: false })
        }
    } catch (error) {
        res.json({ message: "Error in fetching Todos", success: false })
    }

}

const edit = async (req, res) => {
    try {
        if (req.body) {
            const data = await todo.findByIdAndUpdate(req.params.id, req.body)
            if (data) {
                res.json({ data: data, message: "Todo updated successfully", success: true })
            }
            else {
                res.json({ message: "Failed to update Todo", success: false })
            }
        }
    }
    catch (error) {
        res.json({ message: "Error in updating Todo", success: false })
    }
}

const deleted = async (req, res) => {
    try {
        const data = await todo.findByIdAndDelete(req.params.id)
        if (data) {
            res.json({ data: data, message: "Todo deleted successfully", success: true })
        }
        else {
            res.json({ message: "Failed to delete Todo", success: false })
        }
    }
    catch (error) {
        res.json({ message: "Error in deleting Todo", success: false })
    }

}
module.exports = {
    add,
    get,
    getByMessage,
    edit,
    deleted
}