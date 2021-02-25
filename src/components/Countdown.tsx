import React, { useState, useEffect } from 'react'

const Countdown = () => {

  const [time, setTime] = useState(0.1 * 60)

  const minutes = Math.floor(time/60);
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  let countdownTimeout: NodeJS.Timeout;

  function startContdown(){
    setIsActive(true);
  }

  function resetContdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60)
  }

  useEffect(()=>{
    if(isActive && time > 0){    
      countdownTimeout = setTimeout(()=>{
        setTime(time - 1);
      }, 1000)
    }else if(isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  return (
    <div>
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
    </div>  
  )
}

export default Countdown
