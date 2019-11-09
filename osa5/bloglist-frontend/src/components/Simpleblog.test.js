import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Simpleblog from './Simpleblog.js'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'SF',
    url: 'www.reacttest.fi',
    likes: '100'
  }

  const OnClick = () => {
    console.log('hiphei')
  }


  const component = render(
    <Simpleblog blog={blog} onClick={OnClick()}/>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'SF'
  )
  expect(component.container).toHaveTextContent(
    '100'
  )
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'SF',
    url: 'www.reacttest.fi',
    likes: '100'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Simpleblog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)
})