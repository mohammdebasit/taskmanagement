const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const loginUser= async(req,res)=>{
    //req -> email, password
    const {email, password}=req.body
    // db check hai nai hai
    const existUser= await User.findOne({where:{
        email
    }})
    // if not wapis
    if(!existUser) res.json({message:"invalid email"})
    
 const validPassword=  await bcrypt.compare(password,existUser.password)
 if(!validPassword) res.json({message:'invalid credentials'})
    const token= jwt.sign({existUser})
//  jwt token send to user
}

const registerUser= async (req,res) => {
    // req- name, email, password
    const {email, name, password}= req.body
    // first check if already exists
    const userExists= await User.findOne({where:{email}})
    if (userExists) res.json({message:"user already exists"})
    //check if too long password
        if(password.lenght>14) res.json({message:"password too long"})
            //brycp pass
const encriptedPassword= await bcrypt.hash(password,10)


    const newUser=await User.create({name, email,password:encriptedPassword})
    if(!newUser) res.json({message:"user creation failed"})
    // res-> messsage: success/failuere
    res.json({message:"user successfully created"})

}

module.exports={registerUser,loginUser}