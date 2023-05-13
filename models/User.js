const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        
    },

    location:{
        type:String
    },
    img:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('User', UserSchema)