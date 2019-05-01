import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`
function Signin(props) {
  const [signinForm, setSigninForm] = useState({
    email: 'nikcochran@gmail.com',
    password: 'password'
  })

  const saveToState = e => {
    setSigninForm({
      ...signinForm,
      [e.target.name]: e.target.value
    })
  }

  const signin = useMutation(SIGNIN_MUTATION, {
    variables: { ...signinForm },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <form
      className="signinForm"
      method="post"
      onSubmit={async e => {
        e.preventDefault()
        await signin()
        props.history.push(`/`)
      }}
    >
      <fieldset>
        <label htmlFor="email">
          Email
          <TextField
            type="email"
            name="email"
            placeholder="email"
            value={signinForm.email}
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
            value={signinForm.password}
            onChange={saveToState}
            required
          />
        </label>

        <Button variant="contained" color="primary" type="submit">
          Sign In!
        </Button>
      </fieldset>
    </form>
  )
}

export default withRouter(Signin)

export { SIGNIN_MUTATION }
