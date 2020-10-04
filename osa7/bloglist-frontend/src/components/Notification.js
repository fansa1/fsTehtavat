import React from 'react'
import {Alert} from 'react-bootstrap'

const Notification = ({ message }) => {
        const notificationStyle =  {
        fontSize: 20,
        padding: 10,
      }
  
  
    if (message === null) {
    return null
  }

 if(message !== null){
    return(
        <Alert style={notificationStyle} variant="info">
        {message}
      </Alert>
    )
}
}

  export default Notification