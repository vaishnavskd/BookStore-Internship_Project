const User = require('../db/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()
    if (!user) {
        res.status(404).json({ message: "User not found" })
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (passwordCheck) {
        const role = user.role === "user" ? 'user' : 'admin';
        const token = jwt.sign({ email: user.email, id: user._id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const accessToken = JSON.stringify(token)
        res.status(200).json({ accessToken, role })
    } else {
        res.status(401).json({ message: "Invalid password" })
    }
}

module.exports = { Login }