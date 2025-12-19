import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoute.js'

//App COnfig
const app= express()

//Initialize Middleware
app.use(express.json())
app.use(cors())

// Connect to database
connectDB().catch(error => {
    console.error("Database connection failed:", error.message)
})

//API routes
app.get('/', (req, res)=> res.send("API Working"))
app.use('/api/user', userRouter)

// Export for Vercel serverless
export default app

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=> console.log("server running on port " + PORT))
}