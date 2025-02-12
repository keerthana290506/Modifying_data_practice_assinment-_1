const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,required:true,
    },
    description:{
        type:String,
    },
    price:{
        type:String,required:true,min:0,
    }
})

const menuItem = mongoose.model('menuItem',menuItemSchema)

module.exports = menuItem;