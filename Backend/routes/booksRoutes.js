const bookController=require('../controllers/booksController')
const express=require('express')
const router=express.Router()

router.route('/')
    .get(bookController.getBooksData)





module.exports=router