import blogService from '../services/blogs'
import loginService from '../services/login'


const userReducer = (state = {user:null, error:null}, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'SET_USER':
    if(action.content.error){
      return {user:null, error: action.content.error}}
    return {user: action.content, error: null}

    case 'UN_SET_USER':
    return {user: null, error: null}

    case 'SET_LOGGED_IN_USER':
    return {user: action.content, error: null}

    default:
    return state
  }
}

export const setUser = (logincredentials) => {
    return async dispatch => {
    try{
    const user = await loginService.login(logincredentials)
    console.log(user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    await blogService.setToken(user.token)
    
    dispatch(
    {type: 'SET_USER',
    content: user}
    )
}catch (exception) {
   
      }
}
}

export const setLoggedInUser = (user) => {
  return async dispatch => {
    try{
    await blogService.setToken(user.token)
      dispatch(
        {type: 'SET_LOGGED_IN_USER',
        content: user}
      )
    }catch(exception){

    }
  }
}

export const unSetUser = () => {
    window.localStorage.clear()
    return(
    {type: 'UN_SET_USER',
    }
    )
}



export default userReducer