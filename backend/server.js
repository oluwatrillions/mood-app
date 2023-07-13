const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/ConnectDB')
const verifyLogin = require('./controllers/verifyLogin')




dotenv.config({ path: './config/.env' })
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


app.use('/login', require('./routes/api/users/login'))
app.use('/signup', require('./routes/api/users/signup'))
app.use('/create/post', require('./routes/api/posts/post'))

app.use(verifyLogin)
app.use('/users', require('./routes/api/users/users'))





app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})