const mongoose = require('../database/database.js')

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User