import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"

const userRouter = express.Router();

// Register user 
userRouter.post("/register" , registerUser)

// Login user
userRouter.post("/login",loginUser)

export default userRouter