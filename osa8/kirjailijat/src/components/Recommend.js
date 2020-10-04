import React from 'react'
import { CURRENT_USER } from '../queries'
import { useQuery } from '@apollo/client'



const Recommend = (props) => {

const favoriteGenre = useQuery(CURRENT_USER)
  
  if (!props.show) {
    return null
  }

  if (favoriteGenre.loading || props.books.loading)  {
    return <div>loading...</div>
  }

return (
    

    <div>
      <h2>recommendations</h2>
      

      <h3>books in your favorite genre {favoriteGenre.data.me.favoriteGenre}</h3>
      

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
          {props.books.data.allBooks.filter(o=> o.genres.includes(favoriteGenre.data.me.favoriteGenre.toString())).map( a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Recommend
