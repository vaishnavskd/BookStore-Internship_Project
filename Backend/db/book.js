// Books Model
const mongoose=require('mongoose')
const book=new mongoose.Schema({
    name:String,
    coverimg:String,
    author:String,
    genre:String,
    languages:String,
    rentalperiod:Number,
    description:String,
    availstatus:Boolean,
    isbn:Number,
    publicationyr:Date,
})

const BookSchema=mongoose.model('Book',book)

module.exports = BookSchema