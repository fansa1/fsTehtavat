import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if(props.notifications===''){
     return null
   }else{
   
  return (
    <div style={style}>
    {props.notifications}
    </div>
   
  )
   }
  }

  const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
      
      notifications: state.notifications,

    }
  }

  const ConnectedNotification = connect(mapStateToProps, null)(Notification)

  export default ConnectedNotification
