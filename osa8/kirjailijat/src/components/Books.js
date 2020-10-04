import React, {useState, useEffect} from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_BOOKS = gql`
  query allBooks($genre: String!){
    allBooks(
      genre: $genre
    )
    {
      id
      title
      published
      author{
          name
          born
      }
      genres
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks  {
      id
      title
      published
      author{
          name
          born
      }
      genres
    }
  }
`


const Books = (props) => {
const [genre, setGenre] = useState('all genres')
const booksAtFirstLoad = useQuery(ALL_BOOKS)
const [books, setBooks] = useState('')
const [updateGenre, { loading, data }] = useLazyQuery(GET_BOOKS)

useEffect(() => {
    updateGenre({ variables: { genre }})


   if (data && data.allBooks) {
    setBooks(data.allBooks)
    //console.log(books)
  }
    
  }, [updateGenre, books, data, genre])


 
  
  
  if (!props.show) {
    return null
  }
  if (props.show && booksAtFirstLoad.loading) {
    return (
    <div>loading ...</div>
    )
  }

  if (loading) {
    return (
    <div>loading ...</div>
    )
  }

 if(!(genre==='all genres')){
  return (
    

    <div>
      <h2>books</h2>
      
      <h3>in genre {genre}</h3>
      

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(o=> o.genres.includes(genre.toString())).map( a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}


return (
    

    <div>
      <h2>books</h2>
      
      <h3>in genre {genre}</h3>
      

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksAtFirstLoad.data.allBooks.map( a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books