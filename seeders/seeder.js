const Role = require("../models/Role")
const User = require("../models/User")
const bcrypt = require('bcrypt');

async function defaultSeed() {

const role1= await Role.create({name:'Admin'})
const role2= await Role.create({name:'Employee'})
const user1= await User.create({name:"Admin User" , email:'admin@email.com', password: await bcrypt.hash('Admin@123',10) , RoleId:1  })
const user2= await User.create({name:"Employee User" , email:'employee@email.com', password: await bcrypt.hash('Admin@123',10) , RoleId:2  })
    
}

async function testSeed() {
    
}

module.exports={defaultSeed,testSeed}