import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import validator from "validator";



// Creat Token 
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// LOGIN USER 
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Destructuring email and password from the request body

    try {
        // Checking if a user exists with the provided email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User does not exist",
            });
        }

        // Comparing the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Creating a token for the user if authentication is successful
        const token = createToken(user._id);
        
        return res.status(200).send({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error); // Logging the error for debugging
        return res.status(500).send({
            success: false,
            message: "Error in the Login API",
        });
    }
};



// REGISTER USER 
const registerUser = async (req,res)=>{
    const {name , email , password}=  req.body;
    try {
        // checking if user already exists 
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success:false,
                message:"User already exists",
            })
        }

        // validating email formate & strong password 
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please provide valid email "
            })
        }

        // checking password length for strong password meaage and error  
        if(password.length<8){
            return res.json({
                success:false,
                message:"Please enter a strong password "
            })
        }

        // hashing user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user =  await newUser.save()
        const token = createToken(user._id)

        return res.send({
            success:true,
            token,
            message:"Registration successful",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(501).send({
            success:false,
            message:"Error in the Registration",
            error
        })
        
    }
}
export {loginUser , registerUser}