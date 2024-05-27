const mongoose = require('../database/database.js')

const NewsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  journalistsName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageLink: {
    type: String,
    required: true
  }
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;