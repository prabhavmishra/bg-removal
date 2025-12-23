import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoute.js'

//App COnfig
const app= express()

//Initialize Middleware
app.use(cors())

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    console.log('Registered routes check - userRouter:', typeof userRouter)
    next()
})

// Root route first
app.get('/', async (req, res)=> {
    try {
        await connectDB()
        res.send("API Working")
    } catch (error) {
        res.status(500).send("Database connection error")
    }
})

// Direct test route BEFORE router (to test if direct routes work)
app.get('/api/user/test-direct', (req, res) => {
    console.log('Direct route hit!')
    res.json({ message: 'Direct route works', path: req.path })
})

// API routes - webhook route needs raw body, so we handle it before json parser
// Register router BEFORE json parser to ensure raw body for webhooks
app.use('/api/user', userRouter)
console.log('Routes registered: /api/user/*')

// JSON parser for other routes (after webhook route)
app.use(express.json())

// Catch-all for undefined routes (must be last)
app.use((req, res) => {
    console.log(`404 - ${req.method} ${req.path} not found`)
    res.status(404).json({ 
        error: 'Route not found', 
        path: req.path, 
        method: req.method,
        message: `Cannot ${req.method} ${req.path}`,
        availableRoutes: ['/', '/api/user/test', '/api/user/test-direct', '/api/user/webhooks (POST only)']
    })
})

// Export for Vercel serverless
export default app

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=> console.log("server running on port " + PORT))
}