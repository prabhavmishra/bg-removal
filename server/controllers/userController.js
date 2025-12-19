import { Webhook } from "svix"
import userModel from "../models/userModel.js"

// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async(req,res)=> {
    try {
        // Get raw body and headers for webhook verification
        const payload = req.body.toString()
        const svixHeaders = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }
        
        // Verify webhook signature
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const evt = whook.verify(payload, svixHeaders)
        
        // Parse the verified payload
        const {data, type} = evt
    
    switch (type) {
        case "user.created":{
            const userData={
                clerkId: data.id,
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url
            }
            const newUser = await userModel.create(userData)
            console.log("User created:", newUser.email)
            res.json({success: true, message: "User created"})
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