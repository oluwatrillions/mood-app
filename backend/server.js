const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const fileupload = require('express-fileupload')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./database/ConnectDB')



dotenv.config({ path: './config/.env' })
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileupload())


app.use('/login', require('./routes/api/users/login'))

app.use('/signup', require('./routes/api/users/signup'))

app.use('/users', require('./routes/api/users/users'))

app.use('/create/post', require('./routes/api/posts/post'))



app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})