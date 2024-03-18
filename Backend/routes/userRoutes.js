const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')

router.route('/')
    .get(userController.getData)
    .put(userController.updateData)

router.post('/rent', booksController.bookRent)

module.exports = router