import React from 'react'
import {Alert} from 'react-bootstrap'


const ErrorMessage = ({ message }) => {
    const errorStyle =  {
        fontSize: 20,
        padding: 10,
      }
  
    if (message === null) {
    return null
  }

  

if(message !== null){
    return(
        <Alert style={errorStyle} variant="danger">
        {message}
      </Alert>
    )
}
}

  export default ErrorMessage