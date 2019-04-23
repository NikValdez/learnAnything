import ApolloClient from 'apollo-boost'
import React, { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Signup from './components/Signup'
import { endpoint } from './config'

const client = new ApolloClient({
  uri: endpoint,
  credentials: 'include'
})

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Router>
            <Nav />
            <Route exact path="/signup" component={Signup} />
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    </Suspense>
  )
}

export default App
