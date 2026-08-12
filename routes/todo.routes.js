import express from 'express'
import { createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from '../controllers/todo.controller.js'

const route = express.Router()

// route.get('/', (req,res) => {
//     res.send('TODO API is running')
// })

// Create TODO
route.post('/add', createTodo)
// Get all TODOs
route.get('/', getTodos)
// Get TODO by Id
route.get('/:id', getTodoById)
// Update Todo by id
route.put('/:id', updateTodo)
// toggle todo completion status
route.patch('/:id/toggle', toggleTodo)
// Delete Todo based on id
route.delete('/:id', deleteTodo)

export default route