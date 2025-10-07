import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const Signup =async(req,res)=>{
try{
    const {username,email,password}=req.body;
    const ExistingUser=await User.findOne({email});
    if(ExistingUser) return res.status(400).json({error:"Email already in use"});
    
    const hashpassword =await bcrypt.hash(password,10);

    const user=new User({username,email,password:hashpassword});
    await user.save();
    const token=jwt.sign({id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
    res.status(201).json({token,user:{id:user._id,username:user.username}});
}catch(err){
    res.status(500).json({error:err.message});
}
}

//login

export const Signin=async(req,res)=>{
    try{
    const{email,password}=req.body;
    const user= await User.findOne({email});
    if(!user)return res.status(400).json({error:"User Not Found!"});
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch)return res.status(400).json({error:"Invalid credientials"});
     const token =jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"});

        res.json({token,
            user:{id:user._id,username:user.username},
            message:"user Logged in successfully"});
}catch(err){
    res.status(500).json({error:err.message});
}
};

export const Profile =async (req,res)=>{
    try{
        const user= await User.findById(req.user.id).select("-password");
        res.json(user);

    }catch(err){
        res.status(500).json({error:err.message});

    }
}