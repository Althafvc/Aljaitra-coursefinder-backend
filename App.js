const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

const commonRouter = require('./Routers/commonRouter')
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use('/', commonRouter)
    

mongoose.connect('mongodb://localhost:27017/coursefinder')
.then(()=> {
    app.listen(port, ()=> console.log(`server is running on localhost ${port}`))
    console.log('Database connected');

    
}).catch((error)=>console.log('connection error', error))