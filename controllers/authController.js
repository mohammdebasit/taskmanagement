const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Role = require("../models/Role");

const loginUser= async(req,res)=>{
    //req -> email, password
    const {email, password}=req.body
    // db check hai nai hai
    const existUser= await User.findOne({where:{
        email
    },include:{model:Role}})
    // if not wapis
    // console.log(existUser);
    
    if(!existUser) res.json({message:"invalid email"})
    const role = existUser.Role.name
 const validPassword=  await bcrypt.compare(password,existUser.password)
 if(!validPassword) res.json({message:'invalid credentials'})
    const token= jwt.sign({email,role},process.env.JWT_SECRET)
//  jwt token send to user
res.json(token)
}

const registerUser= async (req,res) => {
    // req- name, email, password
    const {email, name, password,RoleId}= req.body
    // first check if already exists
    // console.log(email,name,password,RoleId);
    
    const userExists= await User.findOne({where:{email}})
    if (userExists) res.json({message:"user already exists"})
    //check if too long password
        if(password.lenght>14) res.json({message:"password too long"})
            //brycp pass
const encriptedPassword= await bcrypt.hash(password,10)


    const newUser=await User.create({name, email,password:encriptedPassword, RoleId})
    if(!newUser) res.json({message:"user creation failed"})
    // res-> messsage: success/failuere
    res.json({message:"user successfully created"})

}

module.exports={registerUser,loginUser}