import React, {useState, useEffect} from 'react'
import DisplayFilter from './components/DisplayFilter'
import DisplayForm from './components/DisplayForm'
import DisplayNameAndNumber from './components/DisplayNameAndNumber'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {  

const [ luettelo, setLuettelo] = useState([])
const [ newName, setNewName ] = useState('')
const [ newNumber,setNewNumber ] = useState('')
const [ newFilter, setNewFilter ] = useState('')
const [ message, setMessage] = useState(null)


useEffect(() => {
  personService
  .getAll()
  .then(initialLuettelo=>setLuettelo(initialLuettelo))
},[]) 


const handleFormSubmit = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  
  const puhelinnumeroTiedot = {
    name: newName,
    number: newNumber
    }  

  const names = luettelo.map(luetteloobjekti => luetteloobjekti.name.toLowerCase())
  if(!names.includes(puhelinnumeroTiedot.name.toLowerCase())){
      
    personService
      .create(puhelinnumeroTiedot)
      .then(returnedPuhelinnumerotiedot => (setLuettelo(luettelo.concat(returnedPuhelinnumerotiedot))))
      .catch(error => {
        console.log('fail')
        setMessage(`Error. The addition of ${puhelinnumeroTiedot.name} did not succeed `)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      })
      setNewName('')
      setNewNumber('')

      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  
}else{
  if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
    let idNumber = luettelo.filter(objekti=>objekti.name.includes(newName))[0].id
    const uusipuhnum ={
      name: newName,
      number: newNumber
    }

    personService
    .paivita(idNumber, uusipuhnum)
    .then(paivitystieto => console.log(paivitystieto))
    .catch(error => {
      console.log('fail')
      setMessage(`Error. Information of ${uusipuhnum.name} has already been removed from the server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    personService
    .getAll()
    .then(paivitettylista=>setLuettelo(paivitettylista))
    })
    setNewName('')
    setNewNumber('')
    setMessage(`Changed the phonenumber for ${uusipuhnum.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
}
}
  

  const handleButtonClick= (id) => {
    const poistettavanimi = luettelo.filter(objekti=>objekti.id===(id))[0].name
    if (window.confirm(`Are you sure you wish to delete ${poistettavanimi}?`)){
    personService
        .poista(id)
        .then(poistettuPuhelinnumerotieto => console.log(poistettuPuhelinnumerotieto))
        .catch(error => {
         setMessage(`Error. Information of ${poistettavanimi} has already been removed from the server`)
         setTimeout(() => {
         setMessage(null)
         }, 5000)
          setLuettelo(luettelo.filter(n => n.id !== id))
        })
        let poistettuNimi = luettelo.filter(n=>n.id ===id)[0].name
        setLuettelo(luettelo.filter(n => n.id !== id))
        setMessage(`Deleted ${poistettuNimi}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      }else{
        setLuettelo(luettelo)
      }
    }  
 

    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
      
    } 

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    
    
  }
  

  return (
      <div>
      <h2>Phonebook</h2>
      <Notification message = {message} />
      <DisplayFilter value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <DisplayForm onSubmit={handleFormSubmit} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange}/>
      <h3>Numbers</h3>
      <DisplayNameAndNumber Objektilista={luettelo} filtteri={newFilter} paivitaObjektilista={setLuettelo} ButtonClick={handleButtonClick}/>
      </div>
  )
}


export default App