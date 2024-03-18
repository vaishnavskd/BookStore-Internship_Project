const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
    email: String,
    review: String
});

const book = new mongoose.Schema({
    name: String,
    coverimg: String,
    author: String,
    genre: String,
    languages: String,
    rentalperiod: Number,
    description: String,
    availstatus: Boolean,
    isbn: Number,
    publicationyr: Date,
    summary:String,
    userReview: [userReviewSchema] 
});

const BookModel = mongoose.model('Book', book);

module.exports = BookModel;
