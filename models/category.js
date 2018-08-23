
let mongoose = require("mongoose");
let cateSchema = new mongoose.Schema({
    name: 'String'
})

module.exports = mongoose.model("Category", cateSchema)