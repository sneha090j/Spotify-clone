const express=require('express');
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const {getToken}=require("../Utils/helper");
// this post is for registering
router.post("/register",async(req,res)=>{
    //This code is run when the register api is called as a POST request.
    //My req.body will be of the format(email,password,firstname,lastname,username)
    const {email,password,firstName,lastName,userName}=req.body;
    //step:2
    if (!userName || !firstName) {
        return res.status(400).json({ error: "Username and first name are required" });
    }
    const user=await User.findOne({email:email});
    if(user){
        // res.json();
        return res
        .status(403)
        .json({error:"A user with this email already exists"});
    }
    // step:3
    const hashedPassword=bcrypt.hash(password,10);
    //create new user
    const newUserData={
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userName
    };
    const newUser=await User.create(newUserData);
    // step:4
    // we want tot create the token to return to the user
    const token=await getToken(email,newUser);
    //step:5 return the user
    const userToReturn ={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});







router.post("/login",async(req,res)=>{
    // step 1: Get email and password sent by user from req.body

    const{email,password}=req.body;

    // step 2: Check if a user with the given email exists. If not, the credentials are invalid
    const user=await User.findOne({email:email});
        if(!user){
            return res.status(403).json({err:"Invalid credentials"});

        }
    
    // step 3: If the user exists , check if the password is correct. If not, the credentials are invalid
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(403).json({err:"Invalid credentials"});
    }
    const newUser=await User.create(newUserData);
    const token=await getToken(user.email,newUser);
    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
    // step 4: If the credentials are correct , return a token to the user.
});
module.exports=router;