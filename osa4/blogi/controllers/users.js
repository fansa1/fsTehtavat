const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
   const users =  await User.find({}).populate('blogs')
   response.json(users.map(u => u.toJSON()))
    })

usersRouter.post('/', async (request, response, next) => {

  try {

    const body = request.body
    if (!body.username || String(body.username).length<3) {
    return response.status(400).json({
    error: 'username has no content or is too short'
    })
    }
    if(!body.password || String(body.password).length<3){
    return response.status(400).json({
    error: 'password has no content or is too short'
    })
    }

    User.find({})
    .then(users=>{
    if(users.map(user=> user.toJSON()).find(objekti=> objekti.username.toLowerCase().includes(body.username.toLowerCase()))){
    return response.status(400).json({
    error: 'username must be unique'
    })
    }})
    .catch(error => next(error))

    //tarkistettu Postmanilla.
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter