
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import SetAuthorBirthYear from './components/SetAuthorBirthYear'
import { gql,useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS} from './queries'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
  id
  title
  published
  author{
    id
    name
    born
    bookCount
    }
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
   return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {

 const [token, setToken] = useState(null)
 const [errorMessage, setErrorMessage] = useState(null)
 const client = useApolloClient()
 const authors = useQuery(ALL_AUTHORS)
 const books = useQuery(ALL_BOOKS)
 const [page, setPage] = useState('authors')

 useEffect(() => {
    const token = localStorage.getItem('books-user-token')
    if ( token ) {
      setToken(token)
    }
    if ( token && page === 'login') {
      setPage('authors')
      console.log(page)
    }

  }, [setToken, token, page])


const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    const dataInStoreAuthors = client.readQuery({ query: ALL_AUTHORS})
    console.log(dataInStoreAuthors)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat({title: addedBook.title, published: addedBook.published, author: {id: addedBook.author.id, name: addedBook.author.name, born: addedBook.author.born, bookCount: addedBook.author.bookCount}, genres: addedBook.genres})}})
       }
       if (!includedIn(dataInStoreAuthors.allAuthors, addedBook.author)) {
       client.writeQuery({
       query: ALL_AUTHORS,
        data: { allAuthors : dataInStoreAuthors.allAuthors.concat({name: addedBook.author.name, born: addedBook.author.born, bookCount: addedBook.author.bookCount})}})
     }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
     notify(`${addedBook.title} added`)
     console.log(addedBook)
    
     updateCacheWith(addedBook)
  
 
    }})

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }



  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
           
        
      </div>
       <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <LoginForm
        show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />
        </div>
    )
  }

  return (
    <div>
      <div>
      <button onClick={logout} >logout</button>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        
      </div>

      <SetAuthorBirthYear
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        books={books}
      />

    </div>
  )
}

export default App