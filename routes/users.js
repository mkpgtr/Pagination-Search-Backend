const express = require('express')
const User = require('../models/User')
const mongoose = require('mongoose')
const { findOne, createUser, searchUser, getAllUsers } = require('../utilities/findOne')

const userRoutes = express.Router()

userRoutes.get('/',async(req,res)=>{

    const users = await getAllUsers()

    if(!users){
        return res.status(404).json({msg:'No User Found'})
    }

    res.status(200).json({users})
}) 

userRoutes.post('/',async(req,res)=>{


    const {name,location} = req.body
    
    
    // ! reusable function
   const userFound = await findOne(name,location)


   if(userFound){
    return res.status(400).json({msg:"User already exists"})
   }


    const user = await createUser(req.body)
    
    
    res.status(201).send({user})

})

userRoutes.post('/test',async(req,res)=>{
    console.log(req.body)
    res.status(200).json({user:req.body})
})

userRoutes.get('/search',async(req,res)=>{

    const {name} = req.query
    if(!name){
        return res.status(400).json({msg:"Please enter a search term"})
    }
    const user = await searchUser(name)
    console.log(user)
    if(!user){
       return res.status(404).json({msg:"User not Found"})
    }
    return res.status(200).json({user:user})
})

userRoutes.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid){
        return res.status(400).json({msg:"Please enter a valid object Id"})
    }
    console.log(req.params)


    const findUser = await User.findOne({_id:id})

    if(!findUser){
        return res.status(404).json({msg:"user not found"})
    }


    const deleteUser = await User.findByIdAndDelete({_id:id})

    

    res.status(201).json(deleteUser)
})

userRoutes.get('/:id',async(req,res)=>{
    const {id} = req.params;

    const  isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid){
        return res.status(400).json({msg:"Please enter a valid object Id"})
    }

    const user = await User.findOne({_id:id});

    res.status(200).json({user})





})




module.exports  = {userRoutes}