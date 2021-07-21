
const User = require("../models/userModel");
const secretaccess="c55508391a36839b3ff6ef9e45f815ca770ec2016219959eb9db054cf24208ef6b7f6713c0ab98462a98dd16997f76c7d6d7b4d81f72f2b0d2a42dff4aa7dc7f"
const secretrefresh="be9e1b1846c61107677ace25e13192cb4a6c6e6cdd400bd5fad80ac5b4f48b83aa24e4db29696f83df737bba9ebcc273bd43443c7b78e8f6ac515eb7d361b13e"
const refreshTokens = [];
const jwt = require('jsonwebtoken');
const generateAccessToken = (user)=> {
    return jwt.sign(user, secretaccess, { expiresIn: '20m' });
  }
const generateRefreshToken = (user)=> {
  token= jwt.sign(user, secretrefresh, { expiresIn: '30d' });
  refreshTokens.push(token)
  return token
  }

const tokendecode=(token)=>{
  return jwt.decode(token)
}
module.exports={generateAccessToken,generateRefreshToken,tokendecode}