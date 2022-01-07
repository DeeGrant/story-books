const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

dotenv.config({path: 'config/.env'})

connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode or port ${PORT}`)
})