import React from 'react'
import {Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {unSetUser} from '../reducers/userReducer' 
import {Breadcrumb, Button} from 'react-bootstrap'
import ShowAllBlogs from '../components/ShowAllBlogs'

const NavMenu = ({user, blogs}) => {

     const dispatch = useDispatch()

 const LogoutAndRefresh = () => {
    dispatch(unSetUser())
  }

  return (
    <div>
<Breadcrumb>
  <Breadcrumb.Item href="/blogs">blogs</Breadcrumb.Item>
  <Breadcrumb.Item href="/users">users</Breadcrumb.Item>
  <Breadcrumb.Item active>{user.name} logged in <div style={{padding: "3px"}}></div><Button variant="primary" size="sm" onClick={() => LogoutAndRefresh()}>click here to logout</Button></Breadcrumb.Item>
</Breadcrumb>

    
<Route exact path="/blogs" render={() => <ShowAllBlogs/>} />
<Route exact path="/" render={() => <ShowAllBlogs/>} />
    </div>
  )
}

export default NavMenu