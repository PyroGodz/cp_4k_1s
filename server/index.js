require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorApiMiddleware')
const cors = require('cors')
const PORT = process.env.PORT
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorMiddleware)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()