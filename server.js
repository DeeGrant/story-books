const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

if (process.env.NODE_ENV === 'development') {
    dotenv.config({path: 'config/.env'})
} else {
    dotenv.config()
}

require('./config/passport')(passport)

const client = connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(cors())

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({client: client}),
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})