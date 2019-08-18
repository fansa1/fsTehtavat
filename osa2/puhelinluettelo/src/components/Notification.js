import React from 'react'

const Notification = ({ message }) => {
    const errorStyle =  {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }

     const notificationStyle =  {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
  
  
    if (message === null) {
    return null
  }

  if(message.includes('error') || message.includes('Error')){
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

if(message !== null && !message.includes('error')){
    return(
        <div style={notificationStyle}>
        {message}
      </div>
    )
}
}

  export default Notification