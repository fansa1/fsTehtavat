import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'


const AddedBlogs = ({ blog }) => {
if(!blog || blog.length===0){
  return null
}

if(blog[0].length===0){
 // console.log(blog)
      return(
        <div style={{padding: "3px"}}>
        No blogs yet for this username
        </div>
      )
}

return(

  <div>
  <Card>
  <h3 style={{padding: "3px"}}>Added blogs</h3>
  <ListGroup variant="flush">
    {blog[0].map(o=> 
          <ListGroup.Item key={o.id}>
           {o.title}
         </ListGroup.Item>
        )}
        </ListGroup>
  </Card>
  </div>
    )
}

export default AddedBlogs