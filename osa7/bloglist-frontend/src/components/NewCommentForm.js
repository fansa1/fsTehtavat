import React from 'react'
import { useDispatch } from 'react-redux'
import  { useField } from '../hooks'
import {newComment} from '../reducers/commentReducer' 
import {Button, Form} from 'react-bootstrap'



  const NewCommentForm = ({blog}) => {

   const dispatch = useDispatch()
      
  const [resetComment, inputForComment] = useField('text')   
  
    const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      comment: inputForComment.value,
      blog: blog.id
    }
    resetComment()
    dispatch(newComment(commentObject))
  }
  
return(
    <Form style={{padding: "3px", paddingTop: "5px"}} onSubmit={addComment}>
        <Form.Group controlId="formCommentSubmit">
        <Form.Label>Comment</Form.Label>
        <Form.Control type="input" placeholder="Enter comment" {...inputForComment}/>
          </Form.Group>
          
         <Button variant="primary" size="sm" type="submit">Add comment</Button>
        
       </Form>
    )
    }


   export default NewCommentForm