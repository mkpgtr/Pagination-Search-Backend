const User = require('../models/User.js')

 const findOne = async(name,location)=>{
    const userFound =  await User.findOne({name,location})

    return userFound
}

const createUser = async(body)=>{
    const user = await User.create(body)
    return user
}

const searchUser  = async(name)=>{
    const userFound = await User.findOne({name})
    if(userFound){
        return userFound
    }

    return false
}

const getAllUsers = async()=>{

    const users = await User.find({});
    return users;
}

module.exports = {findOne,createUser,searchUser,getAllUsers}