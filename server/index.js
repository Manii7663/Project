const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const authRoutes = require('./Routes/routes')
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://manii:1234@cluster0.bditt1m.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0")

app.use(cors({
    origin: ['http://localhost:3000'], // Allow requests from this origin
    methods:['Get','Post'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.) to be sent with the request
  }));

// Mount the authentication routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log("Server running on port: ",+ PORT)
})
