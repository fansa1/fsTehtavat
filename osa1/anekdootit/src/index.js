import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const OtsikkoAnekdoottiRandom = (props) => {
    return(
        <h1>
        {props.otsikkoRandomAnekdootti}
        </h1>
    )
}

const OtsikkoAnekdoottiEnitenAania = (props) => {
    return(
        <h1>
        {props.otsikkoAnekdoottiEnitenAania}
        </h1>
    )
}


const Button = (props) => {
    return(

        <button onClick = {props.handleClick} >
        {props.text}
        </button>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

  const AnecdoteDisplay = (props) => {
  return(
      <>
      <p>
      {anecdotes[props.number]}
      </p>
      <p></p>
      </>
  )
  }

const App = () => {

    const taulukko = () => {
        let alkuTaulukko = []
        for(let i=0; i<anecdotes.length; i++)
        alkuTaulukko.push(0)
        return(
            alkuTaulukko
        )
        }

    const [selected, setSelected] = useState(0)
    const [votecounter, setvotecounter] = useState(0)
    const [tietoTaulukko, settietoTaulukko] = useState(taulukko())
    const [voteWinner, setVoteWinner] = useState(0)


let randomInt = (alaraja, ylaraja) => {
    alaraja = Math.ceil(alaraja)
    ylaraja = Math.floor(ylaraja)
    return(
        Math.floor(Math.random()*(ylaraja-alaraja+1))+alaraja
    )
}

let taulukkoUpdate = (t) => {
    let tcopy = t
    tcopy[selected] =tcopy[selected]+1
    t= tcopy
    console.log(t)
    return(
        t
    )
}

let mostVotes = (t) => {
    let max= 0
    let maxpos=0
    for(let value of t){
        if(value>max){
            max=value
        }
    }
    for(let i=0; i<anecdotes.length; i++){
    if(t[i]===max){
        maxpos = i
    }
    }
    //console.log(maxpos)     
    return(
        maxpos
    )
}

let mostVotesAmount = (t) => {
    let max=0
    for(let value of t){
        if(value>max){
            max=value
        }
    }
    return max
}



let RandomAnecdoteWrapper= () => {
    let rannum = randomInt(0,anecdotes.length-1)
    setvotecounter(tietoTaulukko[rannum])
    setSelected(rannum)
    
     
    }
    


const nextRandomAnecdote = () => {
    return () => {
        RandomAnecdoteWrapper()
}
}



const voteWrapper = () => { 
        
        settietoTaulukko(taulukkoUpdate(tietoTaulukko))
        setVoteWinner(mostVotes(tietoTaulukko));
        setvotecounter(tietoTaulukko[selected])
    
    }


const voteAnecdote = () => {
    return () => {
        voteWrapper()
}
}

  const otsikkoRandomAnekdootti = 'Anecdote of the day'
  const otsikkoAnekdoottiAaniaEniten = 'Anecdote with most votes'

 

  return (
    <div>
    <OtsikkoAnekdoottiRandom otsikkoRandomAnekdootti={otsikkoRandomAnekdootti}/>
    <AnecdoteDisplay number={selected} />
    <p> has {votecounter} votes</p>
    <Button text='vote' handleClick={voteAnecdote()}/>
    <Button text='next anecdote' handleClick={nextRandomAnecdote()} />
    <OtsikkoAnekdoottiEnitenAania otsikkoAnekdoottiEnitenAania={otsikkoAnekdoottiAaniaEniten}/>
    <AnecdoteDisplay number={voteWinner}/>
    <p> has {mostVotesAmount(tietoTaulukko)} votes</p>
    </div>
  )
  
}





ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
