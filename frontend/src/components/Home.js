import Button from '@material-ui/core/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Home.css'
import Search from './Search'
import MostRecentCurricula from './MostRecentCurricula'

function Home() {
  return (
    <div className="header">
      <div className="header-center">
        <div>
          <Search />
        </div>
        <div>
          <MostRecentCurricula />
        </div>
      </div>
    </div>
  )
}

export default Home
