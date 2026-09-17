import React from 'react'
import Hero from './Components/Hero'
import Moviecard from './Components/Moviecard'
import Footer from './Components/Footer'

// https://api.tvmaze.com/shows
const App = () => {
  return (
    <div>
      <Hero/>
      <Moviecard/>
      <Footer/>
    </div>
  )
}

export default App
