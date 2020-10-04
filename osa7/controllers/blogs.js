const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blogToUpdate = await Blog.findById(body.blog)
  const comment = new Comment({
      comment: body.comment,
      blog: body.blog
    })  
  try {
  
   if(!body.comment) {
   return response.json({
   error: 'BAD REQUEST, COMMENT MISSING'
   })
   }

   const savedcomment = await comment.save()
   const blog = await Blog.findById(body.blog)
   blog.comments = blog.comments.concat(savedcomment._id)
   await blog.save()
  
    response.json(savedcomment.toJSON())
    } catch(exception) {
    console.log('tallennus epäonnistui')
    }
})



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user').populate('comments')
  //populate('user')
 
  response.json(blogs.map(blog => blog.toJSON()))
  })

 
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const user = await User.findById(decodedToken.id)
  //const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

   //status(400)
   if(!body.title) {
   return response.json({
   error: 'BAD REQUEST, TITLE MISSING'
   })
   }
   if(!body.url){
   return response.json({
   error: 'BAD REQUEST, URL MISSING'
   })
   }

   const savedblog = await blog.save()
    user.blogs = user.blogs.concat(savedblog.id)
    await user.save()
    response.json(savedblog.toJSON())
    } catch(exception) {
    console.log('tallennus epäonnistui')
    }
})


blogsRouter.delete('/:id', async (request, response) => {
  
  //   const decodedToken = jwt.verify(request.token, process.env.SECRET)
   //  if (!request.token || !decodedToken.id) {
  //    return response.status(401).json({ error: 'token missing or invalid' })
   // }
   // console.log(decodedToken)
 
    try{
    const blog = await Blog.findById(request.params.id)
     //console.log(blog)
    // if(blog.user.toString() === decodedToken.id.toString() ){
      await blog.remove()
      return response.status(200).json('blog removed successfully')
   //  }else{
   //    return response.status(401).json({ error: 'only the user that added the blog can delete the blog' })
    // }
    }
    catch(exception){
      console.log('error')
    
    }
 
   
  })
     
 


blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
try{
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.status(200).json('blog updated successfully')
}
catch(exception) {
  next(exception)
}
})

module.exports = blogsRouter