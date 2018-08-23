
let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({

    username: "String",
    password: "String",

   isAdmin:{
       type:Boolean,
       default:false
   }
})

module.exports = mongoose.model("blogUser", userSchema)