const express=require('express')
const app=new express()
require('dotenv').config()
const PORT=process.env.PORT || 3001
const connect=require('./db/dbconnect')
const cors=require('cors')
const UserRoute=require('./routes/userRoutes')
const SignupRoute=require('./routes/signupRoutes')
const LoginRoute=require('./routes/loginRoute')
const BookRoute=require('./routes/booksRoutes')
const AdminRoute=require('./routes/adminRoutes')

app.use(express.json())

// DB Connection
connect()
app.use(cors())
app.use('/api/signup',SignupRoute)
app.use('/api/login',LoginRoute)
app.use('/api/books',BookRoute)
app.use('/api/user',UserRoute)
app.use('/api/admin',AdminRoute)

// Connection to the Server port
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})

//Admin:admin, password:admin123