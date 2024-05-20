// dependencias
const mongoose = require('mongoose')
require('dotenv').config()

// dados do dotenv e connection string
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const connectStr = `mongodb+srv://${dbUser}:${dbPass}@cluster0.tw6auz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// conexao no banco de dados e exportacao
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise
mongoose.connect(connectStr)
.then(() =>{
    console.log('conectei no database')
})
.catch(e => console.log(e))

module.exports = mongoose
