import mongoose from "mongoose";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const registerUser = async(req, res) => {
    try {
        const { username, email, password, role, bio } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "please provide all the required fields" });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "user already exists" });
        }
        const user = new User({
            username,
            email,
            password,
            role,
            bio
        })
        await user.save().then(() => {
            res.status(200).json({ message: "user saved successfully", user });
        }).catch((error) => {
            console.log(error);
            
            res.status(400).json({ message: "error is occurring while saving user" });
        });
    } catch (error) {        
         res.status(400).json({ message: "error is occurring while saving user" });
    }
}

const logIn = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "please provide all required fields" });
        }
        const userExist = await User.findOne({ email }).select("+password");
        if (!userExist) { 
            return res.status(400).json({ message: "user does not exist" });
        }
        const isMatch = await bcryptjs.compare(password,userExist.password);
        if (!isMatch) { 
            return res.status(400).json({ message: "invalid credentials" });
        }
        const payload= {user:{id:userExist._id}}
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({ message: "user successfully logged in" ,userExist,token});
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: "error is occurring while logging in" });
    }
}

export { registerUser,logIn };