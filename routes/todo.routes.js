import express from 'express'
import { createTodo, getTodos, getTodoById } from '../controllers/todo.controller.js'

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

export default route