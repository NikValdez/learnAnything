import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloClient from 'apollo-boost'
import React, { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import CreateCurriculum from './components/CreateCurriculum'
import Curricula from './components/Curricula'
import Curriculum from './components/Curriculum'
import Footer from './components/Footer'
import Home from './components/Home'
import Nav from './components/Nav'
import PleaseSignIn from './components/PleaseSignIn'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'
import Search from './components/Search'
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
                <Route exact path="/request_reset" component={RequestReset} />
                <Route path="/reset/:resetToken" component={Reset} />
                <PleaseSignIn>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/createcurriculum"
                    component={CreateCurriculum}
                  />
                  <Route exact path="/curricula" component={Curricula} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/curriculum/:id" component={Curriculum} />
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
