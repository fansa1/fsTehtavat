import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'



const create = async (newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject.blog}/comments`, newObject)
  //console.log(response)
  return response.data
}


export default { create }