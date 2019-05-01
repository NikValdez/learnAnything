import React from 'react'
import { render } from 'react-testing-library'
import Home from '../components/Home'

it('renders correct text', () => {
  const { getByText } = render(<Home />)
  expect(getByText('This is the Title')).toBeInTheDOM()
})
