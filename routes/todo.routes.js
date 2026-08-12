import express from 'express'
import { createTodo, getTodos } from '../controllers/todo.controller.js'

const route = express.Router()

// route.get('/', (req,res) => {
//     res.send('TODO API is running')
// })

// Create TODO
route.post('/add', createTodo)
route.get('/', getTodos)

export default route