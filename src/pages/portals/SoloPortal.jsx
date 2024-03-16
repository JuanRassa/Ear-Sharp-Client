import React from 'react'
import { Link } from 'react-router-dom'

const SoloPortal = () => {
  
  return (
    <div className='SoloPortal'>
      <section className=''>
        <h2>Available Exercises</h2>
      </section>
      <hr />
      <section className=''>
        <h2>Continue Exercising...</h2>
        <Link to="/exercises">Start Exercise</Link>
      </section>
    </div>
  )
}

export default SoloPortal