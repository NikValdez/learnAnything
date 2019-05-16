import gql from 'graphql-tag'
import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import { CURRENT_USER_QUERY } from './User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

function Signout() {
  const signout = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  return (
    <span onClick={signout}>
      <h4> Sign Out</h4>
    </span>
  )
}

export default Signout
