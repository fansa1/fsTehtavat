const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password and phonenumber (name and number) info as arguments')
  process.exit(1)
}

const password = process.argv[2]
const nimi = process.argv[3]
const numero = process.argv[4]

const url =  `mongodb+srv://fullstack_SF:${password}@cluster0-fzlzd.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
    Person.find({})
        .then(result => {
         console.log('phonebook:')
         result.forEach(person => {
         console.log(`${person.name} ${person.number}`)
         })
         mongoose.connection.close()
        })
    }

    const person = new Person({
        name: nimi,
        number: numero
      })


if(process.argv.length===5){
person.save().then(response => {
  console.log('person saved')
  mongoose.connection.close()
  console.log(`added ${nimi} number ${numero} to phonebook`)
  })
  }

   
 
 
    

