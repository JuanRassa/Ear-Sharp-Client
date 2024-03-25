import React from 'react'

const EndTurnPopup = ({ correctAnswer, yourAnswer, setShowResume }) => {
  return (
    <div className='EndTurnPopup' style={{position: "fixed", display: "flex", width: "100vw",height:"100vh", background:"#000"}} >
      <div>
        {correctAnswer === yourAnswer && (
          <div>
            <p>Correct answer: {correctAnswer}</p>
            <p>Your answer: {yourAnswer}</p>
            <p>Well done!</p>
          </div>
        )}
        {correctAnswer !== yourAnswer && (
          <div>
            <p>Correct answer: {correctAnswer}</p>
            <p>Your answer: {yourAnswer}</p>
            <p>Ups! Sharpen your ear</p>
          </div>
        )}
        <button onClick={() => {
          setShowResume(false)
        }}>Continue</button>
      </div>  
    </div>
  )
}

export default EndTurnPopup