import express from 'express'
import { clerkWebhooks } from '../controllers/userController.js'

const userRouter = express.Router()

// Webhook endpoint needs raw body for signature verification
userRouter.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

export default userRouter
