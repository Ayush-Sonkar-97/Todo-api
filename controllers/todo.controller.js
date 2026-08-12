import Todo from '../models/todo.models.js'

// Create TODO - POST Api call
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body

        // validation 
        if(!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "title is required"
            })
        }

        const todo = await Todo.create({
            title,
            description
        })

        return res.status(201).json({
            success: true,
            message: "Todo created Successfully",
            todo
        })
    }
    catch (error) {
        return res.status(500).json( {
            success: false,
            message: "Internal Server Error",
            error: error.message
        } )
    }
}

// Get all TODO - GET Api

