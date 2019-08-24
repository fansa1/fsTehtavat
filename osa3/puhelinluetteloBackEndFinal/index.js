require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('bodycontent', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodycontent'))

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      response.send(`<p>Phonebook has info for ${persons.map(person => person.toJSON()).length} people ${new Date()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      // console.log(persons.map(person=> person.toJSON())[0].id)
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  // const body = request.body
  // if (!body.name) {
  // return response.status(400).json({
  // error: 'content missing'
  // })
  // }
  // if(!body.number){
  // return response.status(400).json({
  // error: 'content missing'
  // })
  // }
  // Person.find({})
  // .then(persons=>{
  // if(persons.map(person=> person.toJSON()).find(objekti=> objekti.name.toLowerCase().includes(body.name.toLowerCase()))){
  // return response.status(400).json({
  // error: 'name must be unique'
  // })
  // }})
  // .catch(error => next(error))

  const person = new Person({
    name: request.body.name,
    number: request.body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(person => {
      console.log(person)

      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'UnknownEndpoint!' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  // console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
