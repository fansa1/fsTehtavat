import userService from '../services/users'

const allUsersReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'GET_USERS':
    return action.content

    case 'CLEAR_USERS':
    return null

    default:
    return state
  }
}

export const getAllUsers = () => {
    return async dispatch => {
    try {
    const users = await userService.users()
      
    dispatch(
    {type: 'GET_USERS',
    content: users}
    )
}catch (exception) {
}
}
}

export const clearAllUsers = () => {
    
    return(
    {type: 'CLEAR_USERS',
    }
    )
}



export default allUsersReducer