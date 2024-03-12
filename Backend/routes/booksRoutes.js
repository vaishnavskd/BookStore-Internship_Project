const bookController=require('../controllers/booksController')
const express=require('express')
const router=express.Router()

router.get('/',bookController.getAllBooks)
router.get('/:id',bookController.getBookData)




module.exports=router