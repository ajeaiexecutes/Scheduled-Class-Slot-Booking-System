import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const register=async (req,res)=>{
    try {
        console.log("in try");
        

        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"Missing fields"
            })
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            })
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=await User.create({
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            message:"Registration successfull",
            data:newUser.email
        })


    } catch (error) {
        return res.status(500).json ({
            message:"Registration failed"
        })
    }
}

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const user=await User.findOne({email});
        if (!user){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const verifyPassword=await bcrypt.compare(password,user.password)
        if(!verifyPassword){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
        );

        

        return res.status(200).json({
            message:"Login successfull",
            token,
            data:{
                userId:user._id,
                email:email
            }
        })

    } catch (error) {
        
        res.status(500).json({
            message:"Login failed"
        })
    }
}

