import Button from '@material-ui/core/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Home.css'

function Home() {
  return (
    <div className="header">
      <div className="header-center">
        <h1>This is the Title</h1>
        <Link to="/createcurriculum">
          <Button className="button" size="large">
            Create Curriculum
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
