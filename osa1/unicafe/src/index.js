
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackOtsikko = (props) => {
    return(
        <h1>{props.palauteOtsikko}</h1>
    )
}

const StatisticsOtsikko = (props) => {
    return(
        <h1>{props.tilastoOtsikko}</h1>
    )
}
const Button = (props) => {
    return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Statistic = (props) => {
    if(props.good+props.bad+props.neutral>0){
    return(
        
        <table>
        <tbody>
        <tr>
        <td>
        {props.text}
        </td>
        <td>
        {props.value} {props.unit}
        </td>
        </tr>
        </tbody>
        </table>
        

    )
    }else{
    return(
        null
    )
    }

}


const Statistics = (props) => {
    if(props.good+props.bad+props.neutral===0){
    return(
        <>
        <p>No feedback given</p>
        </>
    )
    }else{
    return(
        null
    )
    }

}
 
  

const App = () => {
    const palauteOtsikko = 'give feedback'
    const tilastoOtsikko = 'statistics'  
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  let summa = good-bad

  let lukumaara = good+bad+neutral

  let positiiviset = 0
  if(lukumaara>0) {
    positiiviset = ((good/lukumaara)*100).toFixed(1)
  }

  let keskiarvo = 0

  if(summa>0){
    keskiarvo =  (keskiarvo=summa/lukumaara).toFixed(1)
  } 

  

  return (
    <div>
        <FeedbackOtsikko palauteOtsikko={palauteOtsikko}/>        
        <Button handleClick={() => setGood(good+1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad+1)} text="bad" />
        <StatisticsOtsikko tilastoOtsikko={tilastoOtsikko}/>
        <Statistics good={good} bad={bad} neutral={neutral}/>
        <Statistic text='good' value={good} unit='' good={good} bad={bad} neutral={neutral} />
        <Statistic text='neutral' value={neutral} unit='' good={good} bad={bad} neutral={neutral} />
        <Statistic text='bad' value={bad} unit='' good={good} bad={bad} neutral={neutral} />
        <Statistic text='all' value={lukumaara} unit='' good={good} bad={bad} neutral={neutral} />
        <Statistic text='average' value={keskiarvo} unit='' good={good} bad={bad} neutral={neutral} />
        <Statistic text='positive' value={positiiviset} unit='%' good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))