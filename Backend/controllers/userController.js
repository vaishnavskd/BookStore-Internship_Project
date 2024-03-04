const User = require('../db/user');

const getData = async (req, res) => {
    const { email } = req.params;
    try {
        const userData = await User.findOne({ email });
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}

const updateData = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userData = await User.findOne(decoded.email);
        res.send(userData)
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const { email, password, phone, name } = req.body;
        const updateObj = { email, password, phone, name };

        await User.updateOne({ _id: userData.id }, updateObj);

        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token provided. Authentication required." });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role != 'Admin') {
            return res.status(403).json({ message: "Access forbidden. Admin privileges required." });
        }

        const userData = await User.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getData, updateData, getAllUserData };
