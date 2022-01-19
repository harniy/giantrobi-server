require('dotenv').config()

const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kirill:rfdfcfrb1@cluster0.cvlem.mongodb.net/giantrobiDB?retryWrites=true&w=majority');

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.static((path.join(__dirname, 'public/images'))))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))



const authRoutes = require('./routes/authRoutes')

app.use('/', authRoutes)





app.listen(port, () => console.log(`Start on PORT: ${port}`))