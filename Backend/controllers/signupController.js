const User = require('../db/user')
const bcrypt = require('bcrypt')

const Signup = async (req, res) => {
    const { email, password, name, phone } = req.body
    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const libID = await Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const UserObj = { email, "password": hashedPassword, name, phone, "libraryID": libID }
    const user = await User.create(UserObj)
    if (user) {
        res.status(201).json({ message: "User Created Successfully" })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

module.exports = { Signup }