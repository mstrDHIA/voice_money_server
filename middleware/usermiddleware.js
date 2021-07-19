const User = require("../models/userModel");

const jwt = require('jsonwebtoken');
const generateAccessToken = (user)=> {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

module.exports=generateAccessToken