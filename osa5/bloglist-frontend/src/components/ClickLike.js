import PropTypes from 'prop-types'
import blogService from '../services/blogs'


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

  blogService.update(blog.id,blogObject)
  
  //blogService.getAll()
  //.then(initialBlogs => setBlogs(initialBlogs))
}

export default ClickLikeButton