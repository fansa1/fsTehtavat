import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {voteBlog} from '../reducers/blogReducer' 
import NewCommentForm from '../components/NewCommentForm'
import {Card, Button} from 'react-bootstrap'


const ShowOneBlog = ({id, blogs, comments}) => {

const dispatch = useDispatch()


const ClickLikeButton = (blog) => {
 
  ClickLikeButton.propTypes = {
    props: PropTypes.object.isRequired
    }
   
  const blogObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: String(blog.likes+1)
  }

  dispatch(voteBlog(blog.id, blogObject))
  
}

    
  if(!blogs || blogs.length===0){
    return(
      null
    )
  }
  //console.log(blogs)
  const blogToShow = blogs.filter(b => b.id===id)
  //console.log(blogToShow[0].title)
  
  const commentsToShow = () => {
      const commentsToShow = comments.filter(o=> o.blogid===id)
      return(
      <div>
      {commentsToShow.map(o=> 
      <li key={o.id}> {o.comment} </li>)}
      </div>

      )
  }
  return(
    
          <div>
          <Card bg= "light">
          
            <h2 style={{padding: "3px"}}>{blogToShow[0].title}</h2>
            <li style={{padding: "3px"}}>
            <a href={blogToShow[0].url}>{blogToShow[0].url}</a>
            </li>
            <li style={{padding: "3px"}}>
            {blogToShow[0].likes} likes <Button variant="primary" size="sm"  onClick={()=>ClickLikeButton(blogToShow[0])}>like</Button>
            </li>
             <li style={{padding: "3px"}}>
            added by {blogToShow[0].user.name}
            </li>
            <h4 style={{padding: "3px"}}>Comments</h4>
            {commentsToShow()}
         
            <NewCommentForm blog={blogToShow[0]}/>
             
             </Card>
          </div>
  )
        }
        

export default ShowOneBlog