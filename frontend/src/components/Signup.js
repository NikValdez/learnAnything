import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

function Signup() {
  const [signupForm, setSignupForm] = useState({
    email: 'nenene@gmail.com',
    name: 'nenene',
    password: 'password'
  })

  const saveToState = e => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    })
  }

  const signup = useMutation(SIGNUP_MUTATION, {
    variables: { signupForm }
  })

  return (
    <div>
      <form
        method="post"
        onSubmit={async e => {
          e.preventDefault()
          await signup()
        }}
      >
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={signupForm.email}
              onChange={saveToState}
              required
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              value={signupForm.name}
              onChange={saveToState}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={signupForm.password}
              onChange={saveToState}
              required
            />
          </label>

          <button type="submit">Sign Up!</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup
