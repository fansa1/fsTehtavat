import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const removeBlog = (blog) => {

  removeBlog.propTypes = {
    props: PropTypes.object.isRequired
  }

  if (window.confirm(`Are you sure you wish to delete the blog ${blog.title}?`)){
    blogService.remove(blog.id)
  }}

export default removeBlog