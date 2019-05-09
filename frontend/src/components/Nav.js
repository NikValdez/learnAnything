import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Signout from './Signout'
import './styles/Nav.css'
import User from './User'

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data }) => {
          const me = data ? data.me : null

          return (
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton color="inherit" aria-label="Menu" /> */}
                <Typography variant="h6" color="inherit">
                  <Link to="/">Learn Anything</Link>
                </Typography>
                {!me ? (
                  <div className="authButton">
                    <Button>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                    <Button>
                      <Link to="/signin">Sign In</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="authButton">
                    <Button>
                      <Signout />
                    </Button>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          )
        }}
      </User>
    )
  }
}

export default Nav
