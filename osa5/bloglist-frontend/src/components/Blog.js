import React, { useState} from 'react'
import PropTypes from 'prop-types'
import ClickLikeButton from './ClickLike'
import removeBlog from './RemoveBlog'


const Blog = ({blog,user}) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  const [showAll, setShowAll] = useState(false)
  
  const BoxStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  return(
        <>
        {showAll === false
          ?
          <div style={BoxStyle} onClick={() => toggleVisibility()}>
            {blog.title} {blog.author}
          </div>
          :
          <div style={BoxStyle}>
            <div onClick={() => toggleVisibility()}>{blog.title} {blog.author}</div>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <button onClick={()=>ClickLikeButton(blog)}>like</button></p>
            <p>added by {blog.user.name} </p>
            {blog.user.name===user.name && <p><button onClick={()=>removeBlog(blog)}>remove </button></p>}
          </div>
        }
        </>
  )
}
    
export default Blog