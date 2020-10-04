const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter author name'],
    unique: true,
    minlength: [4, 'The author name is too short']
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
  }
  //book: {
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: 'Book'
  //},
})
schema.plugin(uniqueValidator, { message: 'This author has already been added to the database, did not add a duplicate.' })
module.exports = mongoose.model('Author', schema)
