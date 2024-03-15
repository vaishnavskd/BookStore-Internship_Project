const express = require('express')
const router = express.Router()
const {getAllUserData}=require('../controllers/userController')
const BookRoute=require('../controllers/booksController')

router.get('/users', getAllUserData);
router.get('/books',BookRoute.getAllBooks)