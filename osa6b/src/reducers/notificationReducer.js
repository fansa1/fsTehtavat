import anecdoteService from '../services/anecdotes'
const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'RESET':
      return ''
    case 'VOTE':
      return `You voted: '${action.notification}'`
    case 'NEW_ANECDOTE':
      return `You created anecdote: ${action.data.content}`
    default:
      return state
  }
}


export const setNotification = (time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({type: 'RESET'})
    },time)
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


export default notificationReducer