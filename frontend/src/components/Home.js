import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Home.css'
import Search from './Search'
import MostRecentCurricula from './MostRecentCurricula'
import MostPopular from './MostPopular'
import './styles/Home.css'

function Home() {
  const [toggle, setToggle] = useState(true)

  const recent = () => {
    setToggle(true)
  }
  const popular = () => {
    setToggle(false)
  }

  return (
    <div className="header">
      <div className="header-center">
        <div>
          <Search />
        </div>
        <div>
          <div className="titles">
            <button
              onClick={recent}
              className={toggle ? 'recent-button' : 'plain-button'}
            >
              Recent
            </button>{' '}
            <button
              onClick={popular}
              className={!toggle ? 'popular-button' : 'plain-button'}
            >
              Most Popular
            </button>
          </div>
          {toggle ? <MostRecentCurricula /> : <MostPopular />}
        </div>
      </div>
    </div>
  )
}

export default Home
