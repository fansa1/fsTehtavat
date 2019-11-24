import anecdoteService from '../services/anecdotes'
import { fork } from 'child_process'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
        const AnecdoteToChange = state.filter(o=>o.id===action.content)[0]
        const newAnecdote = {...AnecdoteToChange, votes: AnecdoteToChange.votes+1}
        const changedState = state.filter(o=>o.id!==action.content).concat(newAnecdote)
        changedState.sort((a, b) => (a.votes > b.votes) ? 1 : -1)
        
      
      return changedState
    
      case 'NEW_ANECDOTE':
      const newAddedAnecdote = action.data
      const AllAnecdotes = state.concat(newAddedAnecdote)
      
      return AllAnecdotes

      case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
  dispatch({
    type: 'VOTE',
    content: id,
    notification: votedAnecdote.content
    })
    }
  }


export const createAnecdote= (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch({
        type: 'NEW_ANECDOTE',
    data: newAnecdote
  })
    }
    
  }

  
 

  export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer