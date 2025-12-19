import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoute.js'

//App COnfig
const PORT= process.env.PORT || 4000
const app= express()

//Initialize Middleware
app.use(express.json())
app.use(cors())

//API routes
app.get('/', (req, res)=> res.send("API Working"))
app.use('/api/user', userRouter)

// Start server first
app.listen(PORT, ()=> console.log("server running on port " + PORT))

// Connect to database (non-blocking)
connectDB().catch(error => {
    console.error("Database connection failed:", error.message)
})