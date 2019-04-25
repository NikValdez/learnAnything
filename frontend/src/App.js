import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloClient from 'apollo-boost'
import React, { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { endpoint } from './config'
import theme from './theme'

const client = new ApolloClient({
  uri: endpoint,
  credentials: 'include'
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<p>Loading...</p>}>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <Router>
              <Nav />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/" component={Signin} />
            </Router>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Suspense>
    </MuiThemeProvider>
  )
}

export default App
