import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client'



const EDIT_AUTHOR = gql`

mutation editAuthor($name: String!, $born: Int!) {
     editAuthor(
        name: $name,
        setBornTo: $born,
    )
 {
    name,
    born
  }
}
`

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      
    }
  }
`


const SetAuthorBirthYear = (props) => {
  
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [visible, setVisible] = useState('')
  const [updateAuthor] = useMutation(EDIT_AUTHOR,  {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })


  const submit = async (event) => {
    event.preventDefault()

    if(props.authors.data.allAuthors.map(a=> a.name).includes(name)){
    updateAuthor({ variables: { name, born }})
    setName('')
    setBorn('')
    }else{
   setVisible(true)
   setName('')
    setBorn('')
   setTimeout(() => {
  setVisible(false)
}, 3000)
   
    }
  }

  if (!props.show) {
    return null
  }

 

  

  if (props.authors.loading)  {
    return <div>loading...</div>
  }

if(visible){
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value,10))}
          />
        </div>
        <button type='submit'>update author</button>
        </form>

  <div>
  <h4 style={{fontWeight: 'bold', color:'red'}}> The author name you have entered, is not on the list. Please, enter an author name from the list.
  </h4>
  </div>
  
    </div>
  )
}
return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value,10))}
          />
        </div>
        <button type='submit'>update author</button>
        </form>
  
    </div>
  )

}


export default SetAuthorBirthYear
