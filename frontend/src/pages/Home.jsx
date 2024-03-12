import React from 'react'
import Navbar from '../components/Navbar'

const Home = (props) => {
  return (
    <div>
        <Navbar/>
        {props.child}
    </div>
  )
}

export default Home