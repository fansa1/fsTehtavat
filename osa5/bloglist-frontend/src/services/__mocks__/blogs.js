const blogs = [
    {
      id: '5a451df7571c224a31b5c8ce',
      title: 'HTML is easy',
      author: 'SF',
      url: 'www.yle.fi',
      likes: '10',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'sf',
        name: 'Samuel Fanta'
      }
    },
    {
    id: '5a451e21e0b8b04a45638211',
     title: 'Browser can execute only javascript',
     author: 'uniqueuser',
     url: 'www.facebook.com',
     likes: '15',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'uniqueu',
        name: 'Uniqueusername'
      }
    }
  ]

let token = null

const setToken = (newToken ) => {
  token = (newToken)
}
  
  const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, setToken}