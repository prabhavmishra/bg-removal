import express from 'express'
import { clerkWebhooks } from '../controllers/userController.js'

const userRouter = express.Router()

// Test route to verify router is working
userRouter.get('/test', (req, res) => {
    res.json({ message: 'User router is working', path: '/api/user/test' })
})

// Webhook endpoint needs raw body for signature verification
userRouter.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

export default userRouter
