import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayFilter from './components/DisplayFilter'
import Button from './components/Button'


const App = () => {

const [ maaluettelo, setMaaLuettelo] = useState([])
const [ maaFilter, setMaaFilter ] = useState('')
const [ saatiedot, setSaatiedot ] = useState('')
const [ listaMaista, setlistaMaista] = useState('')
const [ capitalcity, setcapitalcity] = useState('helsinki')
const  [ alfacode, setalfacode]       = useState('FI')
const Api_Key = 'af467d9b8f6d6e2edb8fac395c2619e0'


useEffect(() => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all'
    )
    .then(response => {
      console.log('promise fulfilled')
      setMaaLuettelo(response.data)
    })
}, [])

useEffect(() => {
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${capitalcity},${alfacode}&appid=${Api_Key}`)
    .then(response => {
      console.log('promise fulfilled')
      setSaatiedot(response.data)
      console.log(response.data)
      })  
}, [capitalcity,alfacode])



  const MaaLista = () => {
  const maidennimet = maaluettelo.map(objecti => objecti.name)
  const filtteroidutmaat = maidennimet.filter(name => name.toLowerCase().includes(maaFilter.toLowerCase()))
  const listafiltteroidutmaaobjektit = maaluettelo.filter(objekti => filtteroidutmaat.includes(objekti.name))
  console.log(maaluettelo.filter(objekti => filtteroidutmaat.includes(objekti.name)).map(objekti2=> objekti2.name))
  setlistaMaista(listafiltteroidutmaaobjektit)
  
  if(listafiltteroidutmaaobjektit.length===1){
  setcapitalcity(listafiltteroidutmaaobjektit[0].capital)
  setalfacode(listafiltteroidutmaaobjektit[0].alpha2Code)
  }
  }
   
  
  const NaytaListataiMaa = () => {
  let loppuTulos = ''
  if(listaMaista.length>10){
   loppuTulos=<p>Too many matches, specify another filter</p>
  }
  
  if(listaMaista.length>1 && listaMaista.length <11){
    loppuTulos= 
   <>
      <ul>
       {listaMaista.map(maaObjekti => <li key={maaObjekti.name}>{maaObjekti.name} <Button text='show' handleClick={() => ButtonClickHandler(maaObjekti.name)}/> </li>)}
       </ul>
       </>
    
  }
  
    if(listaMaista.length===1){
        loppuTulos = (MaaOlioDisplayComponent(listaMaista))
    }
    return(
      loppuTulos
    )
     
  }

  
  const MaaOlioDisplayComponent= (MaaOlioLista) => {
    return(
        <div>
        <h2> {MaaOlioLista[0].name}</h2>
        <p></p>
        <div>capital {MaaOlioLista[0].capital}</div>
        <div>population {MaaOlioLista[0].population}</div>
        <p></p>
        <h3>Languages</h3>
        <p></p>
        <ul>
        {MaaOlioLista[0].languages.map(maaobjekti=><li key={maaobjekti.name}>{maaobjekti.name} </li>)}
        </ul>
       <p></p>
       <img src={MaaOlioLista[0].flag} alt="flag" height="25%" width="25%" />
       <p></p>
       <h3>Weather in {MaaOlioLista[0].capital}</h3>
       <p></p>
      <h4>temperature {(saatiedot.main.temp-273).toFixed(2)} Celcius</h4>
      <img src={`http://openweathermap.org/img/wn/${saatiedot.weather[0].icon}@2x.png`}alt="weather" height="25%" width="25%" />
       <h4>Wind: {saatiedot.wind.speed} m/s, direction {saatiedot.wind.deg} deg</h4>
         </div>
    )
  }
  
  
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setMaaFilter(event.target.value)
      MaaLista()       
    }
  
    const ButtonClickHandler= (nimi) => {
      const maidennimet = maaluettelo.map(objecti => objecti.name)
      const filtteroidutmaat = maidennimet.filter(name => name.toLowerCase().includes(nimi.toLowerCase()))
      const filtteroitumaaobjektilista = maaluettelo.filter(objekti => filtteroidutmaat.includes(objekti.name))
      setcapitalcity(filtteroitumaaobjektilista[0].capital)
      setalfacode(filtteroitumaaobjektilista[0].alpha2Code)
      setlistaMaista(filtteroitumaaobjektilista)
      }

  

  return (
      <div>
      <DisplayFilter value={maaFilter} onChange={handleFilterChange}/>
      {NaytaListataiMaa()}
      </div>
  )
  }

export default App