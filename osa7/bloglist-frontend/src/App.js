import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {BrowserRouter as Router,  Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import {blogsAtStart} from './reducers/blogReducer' 
import {unSetUser, setLoggedInUser} from './reducers/userReducer' 
import {getAllUsers} from './reducers/allUsersReducer' 
import {updateComments} from './reducers/commentReducer' 

import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Users from './components/Users'
import AddedBlogs from './components/AddedBlogs'
import NavMenu from './components/NavMenu'
import LoginForm from './components/LoginForm'
import ShowOneBlog from './components/ShowOneBlog'
import {setShowBlogsByUser} from './components/ShowAllBlogs'



const App = () => {


  const dispatch = useDispatch()

  const errorBlog= useSelector(state => state.blogs.error)
  const errorLogin = useSelector(state => state.user.error)
  const successBlog = useSelector(state => state.blogs.success)
  const user = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.allUsers)
  const comments = useSelector(state => state.comments)
  const blogs = useSelector(state => state.blogs.blogs.sort((a,b) => {
   const A = a.likes
   const B = b.likes
   return (A<B) ? -1 : (A>B) ? 1 : 0
  }))


 useEffect(() => {
  dispatch(blogsAtStart())
  dispatch(getAllUsers())
  dispatch(updateComments())
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //console.log(user)
      dispatch(setLoggedInUser(user))
    }
  }, [dispatch])

if(errorBlog || successBlog){
  setTimeout(() => {
      dispatch(blogsAtStart())
    }, 5000)
}

if(errorLogin){
  setTimeout(() => {
      dispatch(unSetUser())
    }, 5000)
}



  return (
    <div>  
      <h1 style={{padding: "2px", paddingBottom: "5px"}}>Blogs App</h1>
      <Router>
      <div>    
      <Notification message={successBlog}/>
      <ErrorMessage message={errorBlog || errorLogin}/>
      {user === null
        ?
        <LoginForm/>
        :
        <div>          
          <NavMenu user={user} blogs={blogs}/>          
          <Route exact path="/users" render={() => <Users user={user} allUsers={allUsers}/>} />      
          <Route exact path="/users/:id" render={({match}) =>
          <AddedBlogs blog={setShowBlogsByUser(match.params.id, allUsers)} />} />
          <Route exact path="/blogs/:id" render={({match}) =>
          <ShowOneBlog id={match.params.id} blogs={blogs} comments={comments}/>} />
        </div>
      }

    </div>
    </Router>
    </div>
  )
}

export default App