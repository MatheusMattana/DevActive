import React, { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

const Countdown = () => {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startContdown, 
    resetContdown 
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  
  return (
    <>
      <div className={ hasFinished ? 'hide': ''}>
        <div id='countdownContainer'>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondsLeft}</span>
            <span>{secondsRight}</span>
          </div>
        </div>
      </div>
      {hasFinished ? (
        <button 
        disabled
        className='countdownButton'>
        cycle ended
        <img src="icons/check.svg" alt="check icon"/>
      </button>
      ) :  (
        <> 
          {isActive ? (
            <button 
            type='button' 
            className='countdownButton' 
            id='countdownButtonActive'
            onClick={resetContdown}>
            Leave cycle
          </button>
          ): (
            <button 
            type='button' 
            className='countdownButton'
            id='countdownButtonInactive' 
            onClick={startContdown}>
            Start cicle
          </button>
          )}
        </>
      )}
    </>  
  )
}

export default Countdown
