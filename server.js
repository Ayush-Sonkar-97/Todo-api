import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import todoroutes from './routes/todo.routes.js'


dotenv.config()
const app = express()
// const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to database
connectDB()

// Routes
app.use('/api', todoroutes)
 
// Test route
// app.get('/' , (req, res) => {
//     res.send("TODO API is running")
// })

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})