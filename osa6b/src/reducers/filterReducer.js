const filterAtStart = ''

const filterReducer = (state = filterAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_FILTER':     
      return action.filtercontent

    default:
      return state
  }
}

export const filterContent = (content) => {
return({
    type: "NEW_FILTER",
    filtercontent: content })
}


export const anecdotesToShow = ({anecdotes,filter}) => {
  let filteredResult = null
  if(anecdotes.map(anecdote=>anecdote.content).filter(o=>o.toLowerCase().includes(filter.toLowerCase()))){
    filteredResult = anecdotes.filter(o=>o.content.toLowerCase().includes(filter.toLowerCase()))
    
  }else{
    filteredResult = anecdotes
    //console.log(store.getState().anecdotes.map(anecdote=>anecdote.content))
    //console.log(store.getState().filter)
        }
  return(
      filteredResult
      
  )
} 

export default filterReducer