const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require('./database/ConnectDB')



dotenv.config({ path: './config/.env' })
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/signup', require('./routes/signup'))

app.use('/users', require('./routes/users'))


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})