import { Webhook } from "svix"
import userModel from "../models/userModel.js"
import connectDB from "../configs/mongodb.js"

// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async(req,res)=> {
    try {
        console.log("Webhook received at:", new Date().toISOString())
        console.log("Headers:", {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"] ? "present" : "missing"
        })
        
        // Ensure database connection
        await connectDB()
        console.log("Database connected")
        
        // Get raw body and headers for webhook verification
        const payload = req.body.toString()
        const svixHeaders = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }
        
        // Check if required headers are present
        if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
            console.error("Missing required Svix headers")
            return res.status(400).json({success: false, message: "Missing required headers"})
        }
        
        // Verify webhook signature
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const evt = whook.verify(payload, svixHeaders)
        
        // Parse the verified payload
        const {data, type} = evt
        console.log("Webhook type:", type)
    
    switch (type) {
        case "user.created":{
            console.log("Webhook received: user.created", JSON.stringify(data, null, 2))
            
            // Handle case where email_addresses might be empty or undefined
            if (!data.email_addresses || data.email_addresses.length === 0) {
                console.error("No email addresses found in webhook data")
                return res.status(400).json({success: false, message: "No email address found"})
            }
            
            const userData={
                clerkId: data.id,
                email: data.email_addresses[0].email_address,
                firstName: data.first_name || "",
                lastName: data.last_name || "",
                photo: data.image_url || ""
            }
            
            console.log("Creating user with data:", userData)
            const newUser = await userModel.create(userData)
            console.log("User created successfully:", newUser.email)
            res.json({success: true, message: "User created", userId: newUser._id})
            break;
        }
        case "user.updated":{

            const userData={
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url
            }
            await userModel.findOneAndUpdate({clerkId:data.id}, userData)
            res.json({})

            break;
        }    
        case "user.deleted":{

            await userModel.findOneAndDelete({clerkId:data.id})
            res.json({})

            break;
        }
    
        default:
            console.log("Unhandled webhook type:", type)
            res.json({success: true, message: "Webhook received but not handled"})
            break;
    }
    } catch (error) {
        console.error("Webhook error:", error.message)
        console.error("Error stack:", error.stack)
        res.status(400).json({success:false,message:error.message})
    }
}
export {clerkWebhooks}