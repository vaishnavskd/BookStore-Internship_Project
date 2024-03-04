const jwt = require('jsonwebtoken');
require('dotenv').config();

const Authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decodedData = decodedData; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = { Authenticate };
