import gql from 'graphql-tag'
import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import { CURRENT_USER_QUERY } from './User'
import Icon from '@material-ui/core/Icon'

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
      <div className="signout">
        <span className="icon">
          <Icon style={{ fontSize: '35px' }}>toggle_off</Icon>
        </span>
        <h4> Sign Out</h4>
      </div>
    </span>
  )
}

export default Signout
