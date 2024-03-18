const express = require('express')
const router = express.Router()
const userRoutes = require('../controllers/userController')
const BookRoute = require('../controllers/booksController')

router.get('/users', userRoutes.getAllUserData);
router.get('/books', BookRoute.getAllBooks)
router.put('/books/:id', BookRoute.updateBooks)
router.delete('/books/:id', BookRoute.deleteBook)
router.post('/books', BookRoute.addBooks)

module.exports = router