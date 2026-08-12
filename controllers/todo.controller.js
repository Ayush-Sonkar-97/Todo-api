import Todo from '../models/todo.models.js'
import mongoose from 'mongoose'

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

export const getTodos = async (req, res) => {
    try {
        // query params
        const { search, sort, page=1, limit=10 } = req.query

        // Base query
        let query = {}

        // Search by title
        if(search) {
            query.title = { 
                $regex: search,
                $options: 'i' // 'i' for case sensitive
            }
        }

        // sorting
        let sortOption = {}
        if(sort === "asc") {
            sortOption.createdAt = 1
        }
        else {
            sortOption.createdAt = -1 // default is -1
        }

        // Pagination
        const skip = (page -1) * limit

        const todos = await Todo.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit))

        const totalTodos = await Todo.countDocuments(query)

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos
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

// Get Todos by id
export const getTodoById = async ( req, res ) => {
    try {
        const { id } = req.params

        // Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo Id"
            })
        }

        const todo = await Todo.findById(id)

        // if todos not found
        if(!todo) {
            return res.status(400).json({
                success: false,
                message: "todo not found"
            })
        }

        // if todo found
        return res.status(200).json({
            success: true,
            message: "todo Fetched successfully",
            data: todo
        })
    }
    catch(error) {
        return res.status(500).json( {
            success: false,
            message: "Internal Server Error",
            error: error.message
        } )
    }
}
