const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const UserSchema=require("./Models/UserSchema")
const authRoutes = require('./Routes/routes')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://manii:1234@cluster0.bditt1m.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0")



// Mount the authentication routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log("Server running on port: ",+ PORT)
})