import React from 'react'
import AnecdoteFilter from '../components/AnecdoteFilter'
import { connect } from 'react-redux'
import { voteAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { anecdotesToShow } from '../reducers/filterReducer'

const AnecdoteList= (props) => {
  
    
  return(
      <> 
      <AnecdoteFilter/>
      {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {props.voteAnecdote(anecdote.id)
                props.setNotification(5000)}}> vote </button>
              </div>
            </div>
          )}
          </> 
  )  
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    notifications: state.notifications,
    visibleAnecdotes: anecdotesToShow(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}


const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
