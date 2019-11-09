import { useState } from 'react'

export const useField = (type,autoComplete,className) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
  setValue('')
    
  }
  

  return [
    reset,
    {
    type,
    autoComplete,
    value,
    className,
    onChange
  }
  ]
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}

