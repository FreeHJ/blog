
let mongoose = require("mongoose");
let contentSchema = new mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "blogUser"
    // },
    title:String,

    addTime:{
        type:Date,
        default:new Date()
    },
    views:{
        type:Number,
        default:0
    },
    content:{
        type:String,
        default:""
    },
    comments:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("Content", contentSchema)