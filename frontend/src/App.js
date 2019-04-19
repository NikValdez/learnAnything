import ApolloClient from 'apollo-boost'
import React, { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
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
        <Router>
          <Signup />
        </Router>
      </ApolloProvider>
    </Suspense>
  )
}

export default App
