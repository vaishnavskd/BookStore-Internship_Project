// User Model
const mongoose = require('mongoose')
const User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    libraryID:Number,
    phone:Number,
    role: { type: String, default: "user" } 
})


const UserSchema = mongoose.model('User', User)

module.exports = UserSchema