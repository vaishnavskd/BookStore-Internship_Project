// User Model
const mongoose = require('mongoose')
const rentedBooksSchema=new mongoose.Schema({
    bookID:String,
    bookName:String
})

const User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    libraryID:Number,
    phone:Number,
    role: { type: String, default: "user" },
    rentedBooks:[rentedBooksSchema]
})


const UserSchema = mongoose.model('User', User)

module.exports = UserSchema