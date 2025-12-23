import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoute.js'

//App COnfig
const app= express()

//Initialize Middleware
app.use(cors())

// API routes - webhook route needs raw body, so we handle it before json parser
app.use('/api/user', userRouter)

// JSON parser for other routes (after webhook route)
app.use(express.json())

//API routes
app.get('/', async (req, res)=> {
    try {
        await connectDB()
        res.send("API Working")
    } catch (error) {
        res.status(500).send("Database connection error")
    }
})

// Test endpoint to verify routing works
app.get('/api/user/test', (req, res) => {
    res.json({ message: 'User API route is working', path: req.path })
})

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found', 
        path: req.path, 
        method: req.method,
        message: `Cannot ${req.method} ${req.path}`
    })
})

// Export for Vercel serverless
export default app

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=> console.log("server running on port " + PORT))
}