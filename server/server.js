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

//API routes
app.get('/', async (req, res)=> {
    try {
        await connectDB()
        res.send("API Working")
    } catch (error) {
        res.status(500).send("Database connection error")
    }
})

app.use('/api/user', userRouter)

// Export for Vercel serverless
export default app

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=> console.log("server running on port " + PORT))
}