import React, { useState, useEffect } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
jest.mock('./services/login')

import App from './App'


afterEach(cleanup)

test('if no user logged, blogs are not rendered', async () => {
  
const component = render(<App />)
component.rerender(<App />)

await waitForElement(
    () => component.getAllByText('login')
  )

  expect(component.container).not.toHaveTextContent(
    'HTML is easy'
  )
  expect(component.container).not.toHaveTextContent(
    'Browser can execute only javascript'
  )
})

test('if user logged in, blogs are rendered', async () => {
  
    const component = render(<App />)
    component.rerender(<App />)

      const usernameinput = component.container.querySelector('input.Usernameinput')
      const password = component.container.querySelector('input.Passwordinput')
      const button = component.container.querySelector('button')
      
      
      fireEvent.change(usernameinput, { target: { value: 'vierailija' } })
      fireEvent.change(password, { target: { value: 'salasana' } })
      fireEvent.submit(button)      

  
    component.rerender(<App />)
    
    await waitForElement(
        () => component.getAllByText('Create')
      )

  expect(component.container).toHaveTextContent(
    'HTML is easy'
  )
  expect(component.container).toHaveTextContent(
    'Browser can execute only javascript'
  )
})