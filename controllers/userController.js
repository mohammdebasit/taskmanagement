const Role = require("../models/Role")
const User = require("../models/User")
const bcrypt= require('bcrypt')
const getAllUsers= async (req,res) => { 
    
 const allUsers= await   User.findAll({include:{model:Role},attributes:['name','email','RoleId']})
 res.json(allUsers)
}

const updateUserbyEmail= async (req,res) => {
   try {
    
       
       const {name,password,email}=req.body
       const encriptedPassword=await bcrypt.hash(password,10)
       const updatedUser= await User.update({password:encriptedPassword, name},{where:{email}})
       res.json({message: "Updated successfully"})
    } catch (error) {
     res.json(error.message)   
    }
}

const getSingleUserbyId= async (req,res) => {
    
    try {
        const user= await User.findOne({where:{id:req.params.id}, include:{model:Role},attributes:['name','email','id','RoleId']})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

const deleteUserbyId=async (req,res) => {
    try {
        const deleteUser= await User.destroy({where:{email:req.body.email}})
        res.json({message:'User deleted successfully'})

    } catch (error) {
        res.json(error.message)
    }
}


module.exports={
getAllUsers,
updateUserbyEmail
,deleteUserbyId,
getSingleUserbyId
}
