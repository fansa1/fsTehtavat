import commentService from '../services/comments'
import blogService from '../services/blogs'


const commentReducer = (state = [], action) => {

   //console.log('state now: ', state)

  switch (action.type) {
    case 'POST_NEW_COMMENT':
     const newAddedComment= action.data
      const AllComments = state.concat({comment: newAddedComment.comment, id: newAddedComment.id, blogid: newAddedComment.blog})
    return AllComments

    case 'UPDATE_COMMENTS':
   
    return action.data

    default:
    return state
  }
}


export const newComment = (comment) => {
    return async dispatch => {
    const newComment = await commentService.create(comment)
    dispatch(
    {type: 'POST_NEW_COMMENT',
    data: newComment
    })
}}

export const updateComments = () => {
   return async dispatch => {
    const blogs = await blogService.getAll()
     let comments = blogs.filter(o=> o.comments.length!==0).map(o=>o.comments)
    let kaikkiKommentit = []
 for (let i = 0; i < comments.length; i++) {
    for (let a = 0; a < comments[i].length; a++) {
   kaikkiKommentit=kaikkiKommentit.concat({comment: comments[i][a].comment, id: comments[i][a].id, blogid: comments[i][a].blog}) 
 }
 }
 dispatch(
{type: 'UPDATE_COMMENTS',
data: kaikkiKommentit}
 )
}}


export default commentReducer