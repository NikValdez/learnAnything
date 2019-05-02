import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloClient from 'apollo-boost'
import React, { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './components/Home'
import Nav from './components/Nav'
import PleaseSignIn from './components/PleaseSignIn'
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
              <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <PleaseSignIn>
                  <Route exact path="/" component={Home} />
                </PleaseSignIn>
              </Switch>
              <Footer />
            </Router>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Suspense>
    </MuiThemeProvider>
  )
}

export default App
