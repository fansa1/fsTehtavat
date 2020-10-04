import React from 'react'
import { useDispatch } from 'react-redux'
import  { useField } from '../hooks'
import {setUser} from '../reducers/userReducer' 
import {Button, Form} from 'react-bootstrap'
  


const LoginForm = () => {

    const [resetUserName, inputForUserName]= useField('text', 'username', 'Usernameinput') 
const [resetPassword, inputForPassword] = useField('text', 'password', 'Passwordinput') 

 const dispatch = useDispatch()

  const handleLogin = (event) => {
      event.preventDefault()
      console.log('logging in with', inputForUserName.value, inputForPassword.value)
        const logincredentials = {
          username: inputForUserName.value,
          password: inputForPassword.value
        }
        dispatch(setUser(logincredentials))
        resetUserName()
        resetPassword()
      } 

    return(
    <>
    <h2 style={{padding: "3px"}}>login</h2>
    <Form onSubmit={handleLogin}>
       <Form.Group controlId="formBasicLoging">
       <Form.Label>Username</Form.Label>
        <Form.Control style={{width: "300px"}} type="username" placeholder="Enter username" {...inputForUserName}/>
       <Form.Label>Password</Form.Label>
         <Form.Control style={{width: "300px"}} type="password" placeholder="Enter password" {...inputForPassword}/>
      </Form.Group>
      <Button variant="primary" size="sm" type="submit">login</Button>
    </Form>
    </>
    )
    }


    export default LoginForm