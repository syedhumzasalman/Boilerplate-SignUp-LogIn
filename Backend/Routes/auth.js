import express from "express"
import { authMiddleware } from "../Middleware/auth.js"
import { loginController, signupController } from "../Controller/auth.js"


const authRoute = express.Router()


authRoute.post("/signup", signupController)

authRoute.post("/login", loginController)




authRoute.post("/createuser", authMiddleware, (request, response) => {
    response.json({
        message: "Post Created",
        status: true
    })
})



export default authRoute