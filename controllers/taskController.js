const jwt = require('jsonwebtoken')
const Task = require('../models/Task')
const User = require('../models/User')
const { DataTypes } = require('sequelize')
const { Sequelize}= require('sequelize')

const getTasks= async(req,res)=>{
//admin
 const payload=jwt.decode(req.headers.authorization.split(' ')[1])
    console.log(payload);
    
const role= payload.role
if(role=='Admin'){
const tasks= await Task.findAll()
res.json(tasks)     
}  else{
    const user= await User.findOne({where:{email:payload.email}})
    const tasks= await Task.findAll({where:{UserId:user.id}})
    res.json(tasks)
}

}


const createTask= async (req,res) => {
    const {title, description}= req.body
const task = await Task.create({title , description })
res.json({message: "task created successfuly"})
}

const assignTasks= async (req,res) => {
        const {id}= req.params
    const task= await Task.findOne({where: {id}})
    if(!task) res.json({message:"task not found wiht id"})
    const updated= await Task.update({UserId:req.body.UserId},{where:{id:task.id}})     
    res.json({message:"succuessfulyl assinged"})
}

const startTaskById= async (req,res) => {
        const {id}= req.params
    const task= await Task.findOne({where: {id}})
    if(!task) res.json({message:"task not found wiht id"})
    const startedTask = await Task.update({status:"in progress",startedTime:Sequelize.literal('CURRENT_TIMESTAMP')},{where:{id:task.id}})     
    res.json({message:"succuessfulyl started"})
}


const endTaskById= async (req,res) => {
        const {id}= req.params
    const task= await Task.findOne({where: {id}})
    if(!task) res.json({message:"task not found wiht id"})
    const startedTask = await Task.update({status:"completed",completedTime:Sequelize.literal('CURRENT_TIMESTAMP')},{where:{id:task.id}})     
    res.json({message:"succuessfulyl ended"})
}


module.exports= {endTaskById,startTaskById,createTask,getTasks,assignTasks}