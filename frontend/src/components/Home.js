import Button from '@material-ui/core/Button'
import React from 'react'
import './styles/Home.css'

function Home() {
  return (
    <div className="header">
      <div className="header-center">
        <h1>This is the Title</h1>
        <Button className="button" size="large">
          Create a Curriculum
        </Button>
      </div>
    </div>
  )
}

export default Home
