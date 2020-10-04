import React from 'react'
import BlogForm from '../components/BlogForm'
import {ListGroup, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useSelector} from 'react-redux'
  
  export const setShowBlogsByUser = (id, allUsers) => {
   return(
   allUsers.filter(o => o.id===id).map(o=>o.blogs))
 }


const ShowAllBlogs = () => {

const blogs = useSelector(state => state.blogs.blogs.sort((a,b) => {
   const A = a.likes
   const B = b.likes
   return (A<B) ? -1 : (A>B) ? 1 : 0
  }))

return(
    <div>
    <BlogForm/>
          <h2 style={{padding: "2px", paddingTop: "10px"}}>Blogs</h2>
          <Card bg= "primary">
          <ListGroup>
          {blogs.map(blog =>
           <ListGroup.Item key={blog.id} variant="light">
           <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
           </ListGroup.Item>
           )}
          </ListGroup>
          </Card>
          </div>
  )}



   export default ShowAllBlogs