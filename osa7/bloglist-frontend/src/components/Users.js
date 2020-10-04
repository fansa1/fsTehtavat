import React from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'


const Users = ({ user, allUsers }) => {
if(user!==null && allUsers.length===0){
  //console.log(allUsers)
  return(
    <div>
    ...loading
    </div>
  )
}

if(user!==null && allUsers.length !==0){
  //console.log(allUsers)
  return(
      <div>
          <h3>Users</h3>
          <Table style={{width: "800px"}} striped bordered hover size="sm">
          <tbody>
          <tr>
            <td></td>
            <td style={{fontWeight: "bold"}}>blogs created</td>
            </tr>
         {allUsers.map(user=> 
            <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td> {user.blogs.length}</td>
            </tr>
            
            )}
            </tbody>
            </Table>
            </div>
      
  )
}
}


export default Users