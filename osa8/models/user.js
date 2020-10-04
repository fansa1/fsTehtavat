const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
      type: String,
      required: true,
      minlengt: 1
  }
})

schema.plugin(uniqueValidator, { message: 'This user has already been added to the database, did not add a duplicate.' })
module.exports = mongoose.model('User', schema)