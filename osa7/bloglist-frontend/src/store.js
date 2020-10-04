import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  comments: commentReducer,
  allUsers: allUsersReducer,
})

const store = createStore(reducer,
    applyMiddleware(thunk))

export default store