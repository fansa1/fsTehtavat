import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }


const create = (Objekti) => {
  const request = axios.post(baseUrl, Objekti)
  return(
  request.then(response => (response.data))
  )
}

const poista = (id) => {
  const poistoOsoite = `http://localhost:3001/persons/${id}`
  const request = axios.delete(poistoOsoite)
  return(
    request.then(response => console.log(response.data))
  )
}


const paivita = (id, puhelinnumero) => {
  const paivitysOsoite = `http://localhost:3001/persons/${id}`
  const request = axios.put(paivitysOsoite, puhelinnumero)
  return(
    request.then(response => (response.data))
  )
}
  
  
  export default { getAll, create, poista, paivita }