const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
 
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

   if(!body.title) {
   return response.status(400).json({
   error: 'BAD REQUEST, TITLE MISSING'
   })
   }
   if(!body.url){
   return response.status(400).json({
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
  
     const decodedToken = jwt.verify(request.token, process.env.SECRET)
     if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
   // console.log(decodedToken)
 
    try{
    const blog = await Blog.findById(request.params.id)
     //console.log(blog)
     if(blog.user.toString() === decodedToken.id.toString() ){
      await blog.remove()
      return response.status(200).json('blog removed successfully')
     }else{
       return response.status(401).json({ error: 'only the user that added the blog can delete the blog' })
     }
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
}
catch(exception) {
  next(exception)
}
})

module.exports = blogsRouter