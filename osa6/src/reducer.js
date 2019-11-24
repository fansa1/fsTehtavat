const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
        const changedStateg = { 
          ...state, good: state.good+1
        }
      return changedStateg
    case 'OK':
        const changedStateo = { 
          ...state, ok: state.ok+1
        }
      return changedStateo
    case 'BAD':
        const changedStateb = { 
          ...state, bad: state.bad+1
        }
      return changedStateb
      
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer