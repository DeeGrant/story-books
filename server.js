const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path: 'config/.env'})

connectDB()

const app = express()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode or port ${PORT}`)
})