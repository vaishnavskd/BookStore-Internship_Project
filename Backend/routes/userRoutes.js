const express = require('express')
const router = express.Router()
// const { Authenticate } = require('../middleware/authToken')
const { getData } = require('../controllers/userController')

router.get('/userdata', getData);

module.exports = router