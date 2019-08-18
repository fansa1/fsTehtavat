import React from 'react'

const DisplayForm = ({onSubmit, valueName, onChangeName, valueNumber, onChangeNumber}) => {
      return(
      <>
      <form onSubmit={onSubmit}>
      <div>
      name: <input value={valueName} onChange={onChangeName}/>
      <div>number: <input value={valueNumber} onChange={onChangeNumber}/></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
      )
  }

  export default DisplayForm