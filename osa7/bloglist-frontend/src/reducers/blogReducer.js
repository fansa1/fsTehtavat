import blogService from '../services/blogs'

const blogReducer = (state = {blogs: [], error: null, success: null} , action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  

  switch (action.type) {
    case 'VOTE_BLOG':
        const blogToChange = state.blogs.filter(o=>o.id===action.content)[0]
        const changedBlog = {...blogToChange, likes: blogToChange.likes+1}
        const changedState = state.blogs.filter(o=>o.id!==action.content).concat(changedBlog)
        changedState.sort((a, b) => (a.votes > b.votes) ? 1 : -1)
      
      return {blogs: changedState, error: null, success: null}
    
      case 'NEW_BLOG':
       if(action.data.error){
          return {blogs: state.blogs, error: action.data.error, success:null}
       }

  
      const Allblogs = {blogs: state.blogs.concat(action.data), error: null, success: `A new blog"${action.data.title}" by ${action.data.author} was added to the database` }
      return Allblogs

       case 'REMOVE_BLOG':
       const AllBlogsMinusOne = state.filter(o=>o.id!==action.content)      
      return {blogs: AllBlogsMinusOne, error: null, success: null}

      case 'INITIAL_BLOGS':
      return {blogs: action.data, error: null, success: null}

    default:
      return state
  }
}

export const blogsAtStart = () => {
    return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(
    {type: 'INITIAL_BLOGS',
    data: blogs}
    )
}
}

export const newBlog = (blog) => {
    return async dispatch => {
    try{
    const newblog = await blogService.create(blog)
    
  
    dispatch(
    {type: 'NEW_BLOG',
    data: newblog}
    )
}
catch(e){
  console.log(e)
  dispatch(
    {type: 'NEW_BLOG',
    data: e}
    )
}
}
}

export const blogRemove = (id) => {
    return async dispatch => {
    await blogService.remove(id)
    dispatch(
    {type: 'REMOVE_BLOG',
    content: id}
    )
}
}

export const voteBlog = (id, newObject) => {
     return async dispatch => {
     await blogService.update(id, newObject)
     dispatch({
     type: 'VOTE_BLOG',
     content: id
     })
     }
}

export const setToken = (id, newObject) => {
     return async dispatch => {
     await blogService.update(id, newObject)
     dispatch({
     type: 'VOTE_BLOG',
     content: id
     })
     }
}
     


export default blogReducer