require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json()) 

//connect to DB
mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => { 
            console.log('Connected to database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })