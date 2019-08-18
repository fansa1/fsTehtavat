import React from 'react'

const DisplayFilter = ({value, onChange}) => {
    return(
      <>
      filter shown with <input value={value} onChange={onChange}/>
      </>
    )
  }

export default DisplayFilter