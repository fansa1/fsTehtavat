import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks  {
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

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
    id
   }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`