import Todo from '../models/todo.models.js'
import mongoose from 'mongoose'
import { asyncHandler } from '../middlewares/asynchHandler.js'

// Create TODO - POST Api call
export const createTodo = asyncHandler(async (req, res) => {

    const { title, description } = req.body

    // validation 
    if (!title || title.trim() === "") {
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
})

// Get all TODO - GET Api
export const getTodos = asyncHandler(async (req, res) => {
    // query params
    const { search, sort, page = 1, limit = 10 } = req.query

    // Base query
    let query = {}

    // Search by title
    if (search) {
        query.title = {
            $regex: search,
            $options: 'i' // 'i' for case sensitive
        }
    }

    // sorting
    let sortOption = {}
    if (sort === "asc") {
        sortOption.createdAt = 1
    }
    else {
        sortOption.createdAt = -1 // default is -1
    }

    // Pagination
    const skip = (page - 1) * limit

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
})

// Get Todos by id
export const getTodoById = asyncHandler(async (req, res) => {

    const { id } = req.params

    // Validate ID based on mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Todo Id"
        })
    }

    const todo = await Todo.findById(id)

    // if todos not found
    if (!todo) {
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

})

// Update Todo by ID PUT API
export const updateTodo = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    // validate id based on mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "invalid todo Id"
        })
    }

    // Valid Input
    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            message: "title is required"
        })
    }

    // Update Todo
    const todo = await Todo.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true } // To return the updated document
    )

    // If todo not found
    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "todo not found"
        })
    }

    // If todo found and updated
    return res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: todo
    })

})

// Toggle Todo by ID PATCH API
export const toggleTodo = asyncHandler(async (req, res) => {

    const { id } = req.params

    // mongoose validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Todo Id"
        })
    }

    // GET current Todo
    const todo = await Todo.findById(id)

    // If todo not found
    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        })
    }

    // Toggle flip is complete filled
    todo.isCompleted = !todo.isCompleted

    await todo.save();

    // if Todo found and updated

    return res.status(200).json({
        success: true,
        message: "todo toggeled successfully",
        data: todo
    })

})

// Delete todo delete API
export const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Todo Id"
        })
    }

    // Delete Todo
    const todo = await Todo.findByIdAndDelete(id);

    // If todo not found
    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        })
    }

    //if todo found then delete
    return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: todo
    })

})