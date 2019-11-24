import React from 'react'
import { connect } from 'react-redux'
import { filterContent } from '../reducers/filterReducer'


const Filter = (props) => {
  const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        //console.log(content)
        props.filterContent(content)
        }


  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
    filterContent,
  }


const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedAnecdoteFilter