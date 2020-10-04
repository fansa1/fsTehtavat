import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'



const CREATE_BOOK = gql`

mutation addBook($title: String!, $author: String!, $published: Int!, $birthday: Int, $genres: [String!]!) {
     addBook(
        title: $title,
        published: $published,
        name: $author,
        born: $birthday,
        genres: $genres
    )
 {
    title,
    published,
    genres,
    author{
      name,
      born,
      bookCount
    }
  }
}
`

 //const GET_BOOKS = gql`
 // query allBooks($genre: String!){
 //   allBooks(
 //     genre: $genre
 //   )
 //   {
 //     title
 //     published
 //     author{
 //         name
 //         born
 //     }
 //     genres
 //   }
 // }
//  `

const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author{
        name
      }
      published
    }
  }
`
const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
   const [authorBirth, setAuthorBirth] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [newBook] = useMutation(CREATE_BOOK,  {
    refetchQueries: [ { query: ALL_BOOKS }, {query: ALL_AUTHORS }]})

    
 

  const submit = async (event) => {
    event.preventDefault()
    let birthday = null
    if(authorBirth>0){
      birthday=authorBirth
    }

    newBook({ variables: { title, author, published, birthday, genres } })



    setTitle('')
    setAuthorBirth('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  } 

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
         <div>
          author birthyear
          <input
          type='number'
            value={authorBirth}
            onChange={({ target }) => setAuthorBirth(parseInt(target.value,10))}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value,10))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook