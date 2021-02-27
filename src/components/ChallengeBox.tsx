import React, {useContext, useState} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext';

const ChallengeBox = () => {
  const {  
    activeChallenge, 
    resetChallenge, 
    completeChallenge 
  } = useContext(ChallengesContext);

  const { resetContdown, hasFinished } = useContext(CountdownContext)
  
  function handleChallengeCompleted(){
    completeChallenge()
    resetContdown()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetContdown()
  }

  return (
    <>
    <div id='challengeBoxContainer'>
      { activeChallenge ? (
        <div id='challengeBoxActive'>
          <header>New challenge</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Get xp icon"/>
            <strong>Get {activeChallenge.amount} xp</strong>
            <p>{activeChallenge.description} </p>
          </main>
          <footer>
          <button 
            type='button'
            id='challengeCompletedButton'
            onClick={handleChallengeCompleted}>  
              Completed
          </button>
            <button 
              type='button'
              id='challengeFailedButton'
              onClick={handleChallengeFailed}>
                Failed
            </button>
          </footer>
        </div>
      ) : (
      <div id="challengeBoxNotActive">
        <img src="/HealthyDevLogoFull.svg" alt="App Logo"/>
        <strong>Complete a cycle to receive challenges</strong>
        <p>
          <img src="icons/level-up.svg" alt="level up icon"/>
          Level up by completing challenges 
        </p>   
      </div>
      )}
    </div>
    </>
  )
}

export default ChallengeBox
