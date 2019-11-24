import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (anecdoteid) => {
  const response = await axios.get(`http://localhost:3001/anecdotes/${anecdoteid}`)
  const anecdoteContent = response.data
  const object = { ...anecdoteContent, votes: anecdoteContent.votes+1}
  const changedVoteValue = await axios.put(`http://localhost:3001/anecdotes/${anecdoteid}`, object)
  return response.data
}


export default {
  getAll,
  createNew,
  voteAnecdote
}

