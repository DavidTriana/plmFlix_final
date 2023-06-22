const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({

    username: {
        type: String,
        required : true,
        unique: true,
        index: true,
    },

    password: {
        type: String,
        requiered: true,
    },
     
 });
    
 module.exports = mongoose.model("User", user);