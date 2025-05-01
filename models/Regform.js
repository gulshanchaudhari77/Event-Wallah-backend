const mongoose = require("mongoose")

const regFormSchema =  new mongoose.Schema ({

    name:
    {
        type:String,
        required:true,
    },
    branch:
    {
        type:String,
        required:true,
    },
    college:
    {
        type:String,
        required:true,
    },
    semester:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
    },
    phoneno:
    {
        type:Number,
        required:true,
    },
    event : {
        type : mongoose.Schema.ObjectId,
        ref : "event"
    }
   


})

module.exports = mongoose.model("regform", regFormSchema)