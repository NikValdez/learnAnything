import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Signout from './Signout'
import './styles/Nav.css'
import User from './User'
import Logo from '../images/logo.png'
import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

function Nav() {
  const [navScroll, setNavScroll] = useState(false)
  const [drawer, setDrawer] = useState({
    top: false,
    right: false
  })

  const toggleDrawer = (side, open) => () => {
    setDrawer({
      [side]: open
    })
  }

  const handleScroll = e => {
    if (window.scrollY > 100) {
      setNavScroll(true)
    } else {
      setNavScroll(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null

        return (
          <AppBar
            position="static"
            style={{
              background: !navScroll ? 'transparent' : '',
              position: 'fixed',
              top: 0,
              transition: 'height 0.3s ease',
              height: !navScroll ? '90px' : '50px'
            }}
          >
            <Link to="/" className={!navScroll ? 'title' : 'titleScroll'}>
              Learn Anything
            </Link>
            <div className="logo">
              {!navScroll ? <img src={Logo} style={{ width: '50px' }} /> : null}
            </div>

            {!me ? (
              <div className={!navScroll ? 'authButton' : 'scrollAuthButton'}>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button>
                  <Link to="/signin">Sign In</Link>
                </Button>
              </div>
            ) : (
              <div className={!navScroll ? 'authButton' : 'scrollAuthButton'}>
                <Button
                  onClick={toggleDrawer('right', true)}
                  style={{ background: 'transparent' }}
                >
                  <Icon color="primary" style={{ color: 'black' }}>
                    menu
                  </Icon>
                </Button>
                <Drawer
                  anchor="right"
                  open={drawer.right}
                  onClose={toggleDrawer('right', false)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleDrawer('right', false)}
                    onKeyDown={toggleDrawer('right', false)}
                  >
                    <List>
                      <ListItem className="list-item">
                        <Signout />
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              </div>
            )}
          </AppBar>
        )
      }}
    </User>
  )
}

export default Nav
