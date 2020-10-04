const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please, enter a title'],
    unique: true,
    minlength: [2, 'The title is too short']
    
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

schema.plugin(uniqueValidator , { message: 'Error, expected title to be unique.' })

module.exports = mongoose.model('Book', schema)