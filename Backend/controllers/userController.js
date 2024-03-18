const User = require('../db/user');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getData = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        const { email } = decoded;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};



const updateData = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        const userData = await User.findOne({ email: decoded.email });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const { email, password, phone, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const updateObj = { email, "password": hashedPassword, phone, name };

        await User.updateOne({ _id: userData.id }, updateObj);

        res.status(200).json({ message: 'Successfully Updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const rentedDetails = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        const rentBookData = decoded.rentedBooks;
        if (!rentBookData) {
            console.log("No books Rented")
        }
        res.status(200).json(rentBookData)
    } catch (error) {
        console.error("Error in rentedDetails:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }

        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: "Access forbidden. Admin privileges required." });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllUserData = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role != 'admin') {
            return res.status(403).json({ message: "Access forbidden. Admin privileges required." });
        }
        const userData = await User.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getData, updateData, getAllUserData, deleteUser, rentedDetails };
