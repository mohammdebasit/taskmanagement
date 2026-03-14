const Role = require("../models/Role");
const Task = require("../models/Task");
const User = require("../models/User")
const bcrypt = require('bcrypt');

async function defaultSeed() {

const role1= await Role.create({name:'Admin'})
const role2= await Role.create({name:'Employee'})
const user1= await User.create({name:"Admin User" , email:'admin@email.com', password: await bcrypt.hash('Admin@123',10) , RoleId:1  })
const user2= await User.create({name:"Employee User" , email:'employee@email.com', password: await bcrypt.hash('Admin@123',10) , RoleId:2  })
    
}

async function testSeed() {
 const task1= await Task.create({title:"first task",description:"abc sinfasdj fjsadf asfd"})   
 const task2= await Task.create({title:"Second task",description:"abc sinfasdj fjsadf asfd"})   
 const task3= await Task.create({title:"Third task",description:"abc sinfasdj fjsadf asfd"})   
 const task4= await Task.create({title:"Fourth task",description:"abc sinfasdj fjsadf asfd"})   
 const task5= await Task.create({title:"Fifth task",description:"abc sinfasdj fjsadf asfd"})   
 const task6= await Task.create({title:"Sixth task",description:"abc sinfasdj fjsadf asfd", UserId:2})   
}

module.exports={defaultSeed,testSeed}