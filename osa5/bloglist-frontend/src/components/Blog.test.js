import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Samun UUSI BLOGI',
    author: 'SF',
    url: 'www.reacttest.fi',
    likes: '100',
    id: 'NRO1',
    user: { name: 'KARI',
      affiliation: 'HY' }
  }

  const user = {
    name: 'Samuel',
    affiliation: 'HY'
  }


  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Samun UUSI BLOGI SF'
  )
  expect(component.container).not.toHaveTextContent(
    '100'
  )

})




test('after clicking div more content is displayed', () => {
  const blog = {
    title: 'Samun UUSI BLOGI',
    author: 'SF',
    url: 'www.reacttest.fi',
    likes: '100',
    id: 'NRO1',
    user: { name: 'KARI',
      affiliation: 'HY' }
  }

  const user = {
    name: 'Samuel',
    affiliation: 'HY'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('Samun UUSI BLOGI SF')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    '100'
  )

})

