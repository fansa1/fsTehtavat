/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import PropTypes from 'prop-types'
import  { useField } from './hooks'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs.sort((a, b) => {
        const A = a.likes
        const B = b.likes
        return (A < B) ? -1 : (A > B) ? 1 : 0
      })))
  }, [notificationMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  
  const [resetUserName, inputForUserName]= useField('text', 'username', 'Usernameinput') 
  //const {reset, ...inputUserNameNoReset}= inputForUserName  
  const [resetPassword, inputForPassword] = useField('text', 'password', 'Passwordinput') 
  
  const [resetTitle, inputForBlogTitle] = useField('text') 
  
  const [resetAuthor, inputForBlogAuthor] = useField('text') 
  
  const [resetUrl, inputForBlogUrl] = useField('text') 
  
  
  
  

  const rows = () => {

    return(
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      ))}

  const AllBlogs = ({ rivit }) => {

    AllBlogs.propTypes = {
      rivit: PropTypes.object.isRequired
    }

    return(
    <>
    {rivit}
    </>
    )
  }



  const loginForm = () => {

    return(
    <>
    <h2>login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
         {...inputForUserName}
        />
      </div>
      <div>
        password
        <input
          {...inputForPassword}
        />
      </div>
      <button className="loginbutton" type="submit">login</button>
    </form>
    </>
    )}

    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', inputForUserName.value, inputForPassword.value)
      try {
        const logincredentials = {
          username: inputForUserName.value,
          password: inputForPassword.value
        }
        const user = await loginService.login(logincredentials)
  
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        setUser(user)
        resetUserName()
        resetPassword()
      } catch (exception) {
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return(
      <Togglable buttonLabel="new blog" ref={blogFormRef}>

        <form onSubmit={addBlog}>
          <div> title
            <input {...inputForBlogTitle}/>
          </div>
          <div> author
            <input {...inputForBlogAuthor}/>
          </div>
          <div> url
            <input {...inputForBlogUrl}/>
          </div>
          <button type="submit">create</button>
        </form>

      </Togglable>
    )}


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: inputForBlogTitle.value,
      author: inputForBlogAuthor.value,
      url: inputForBlogUrl.value,
      likes: 0
    }
    blogService.create(blogObject)
    resetTitle()
    resetAuthor()
    resetUrl()
    blogFormRef.current.toggleVisibility()
    const blogeja = await blogService.getAll()
    setBlogs(blogeja)
    setNotificationMessage(`A new blog"${inputForBlogTitle.value}" by ${inputForBlogAuthor.value} was added to the database`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }


  const LogoutAndRefresh = () => {
    window.localStorage.clear()
    window.location.reload()
  }



  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage}/>
      <ErrorMessage message={errorMessage}/>

      {user === null
        ?
        loginForm()
        :
        <div>
          <p>{user.name} logged in <button onClick={() => LogoutAndRefresh()}>logout</button></p>
          <h1>Create</h1>
          {blogForm()}
          <ul>
            <AllBlogs rivit={rows()}/>
          </ul>
        </div>
      }

    </div>
  )
}

export default App