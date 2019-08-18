import React from 'react'

const DisplayFilter = ({value, onChange}) => {
    return(
      <>
      find countries <input value={value} onChange={onChange}/>
      </>
    )
  }

export default DisplayFilter