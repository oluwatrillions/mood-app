const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/ConnectDB')
const verifyUser = require('./controllers/verifyUser')
const bodyParser = require('body-parser')



dotenv.config({ path: './config/.env' })
connectDB()
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


app.use('/login', require('./routes/api/users/login'))
app.use('/signup', require('./routes/api/users/signup'))
app.use('/post/create', require('./routes/api/posts/post'))
app.use('/posts', require('./routes/api/posts/posts'))
app.use('/refreshtoken', require('./routes/api/users/refreshtoken'))
app.use('/logout', require('./routes/api/users/logout'))
app.use('/posts/likes', require('./routes/api/likes/likes'))



// app.use(verifyUser)
app.use('/users', require('./routes/api/users/users'))



app.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`listening on port ${process.env.PORT}`)
})