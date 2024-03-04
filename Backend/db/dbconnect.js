const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url)
        console.log("Connected to Db");
    } catch {
        console.log("Error");
    }
}

module.exports = connect