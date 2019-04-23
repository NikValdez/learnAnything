import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
    email: '1nenene@gmail.com',
    name: '1nenene',
    password: '1password'
  })

  const saveToState = e => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    })
  }

  const signup = useMutation(SIGNUP_MUTATION, {
    variables: { ...signupForm }
  })

  return (
    <form
      className="signupForm"
      method="post"
      onSubmit={async e => {
        e.preventDefault()
        await signup()
        // this.props.history.push(`/`)
      }}
    >
      <fieldset>
        <label htmlFor="email">
          Email
          <TextField
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
          <TextField
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
          <TextField
            type="password"
            name="password"
            placeholder="password"
            value={signupForm.password}
            onChange={saveToState}
            required
          />
        </label>

        <Button variant="contained" color="primary" type="submit">
          Sign Up!
        </Button>
      </fieldset>
    </form>
  )
}

export default Signup
