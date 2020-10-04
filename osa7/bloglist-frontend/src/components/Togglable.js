import React, { useState, useImperativeHandle } from 'react'
import {Button} from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{padding: "5px"}}>
      <div style={hideWhenVisible}>
        <Button  variant="secondary" size="sm" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div style={{paddingTop: "3px"}} >
        <Button variant="secondary" size="sm" onClick={toggleVisibility}>cancel</Button>
        </div>
      </div>
    </div>
  )
})

export default Togglable