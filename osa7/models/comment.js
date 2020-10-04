const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
  comment: String,
  blog:
   {
  type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  
})

const Comment = mongoose.model('Comment', commentSchema)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = Comment