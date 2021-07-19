const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:false
    },
    lastname:{
        type:String,
        required:false
    },  
    age:{
        type:Number,
        required:false
    },
    sex:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    socialstate:{
        type:String,
        required:false
    },
})
module.exports = mongoose.model("User", UserSchema);