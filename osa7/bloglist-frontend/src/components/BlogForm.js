import React from 'react'
import { useDispatch } from 'react-redux'
import  { useField } from '../hooks'
import Togglable from '../components/Togglable'
import {newBlog} from '../reducers/blogReducer' 
import {Button, Form} from 'react-bootstrap'
  

  const BlogForm = () => {

  const dispatch = useDispatch()
  const [resetTitle, inputForBlogTitle] = useField('text') 
  const [resetAuthor, inputForBlogAuthor] = useField('text') 
  const [resetUrl, inputForBlogUrl] = useField('text') 
  const blogFormRef = React.createRef()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: inputForBlogTitle.value,
      author: inputForBlogAuthor.value,
      url: inputForBlogUrl.value,
      likes: 0
    }
    resetTitle()
    resetAuthor()
    resetUrl()
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blogObject))
 
  }
      

    return(
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>

      <Form onSubmit={addBlog}>
      <Form.Group controlId="formBasicSubmit">
    <Form.Control type="title" placeholder="Enter new blog title" {...inputForBlogTitle}/>
    <Form.Control type="author" placeholder="Enter new blog author" {...inputForBlogAuthor} />
    <Form.Control type="url" placeholder="Enter new blog url" {...inputForBlogUrl} />
    </Form.Group>
    <Button variant="primary" size="sm" type="submit">Create new blog</Button>
  </Form>

   
           
    

      </Togglable>
    )}
  

 export default BlogForm