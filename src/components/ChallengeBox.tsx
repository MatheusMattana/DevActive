import React, {useContext, useState} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext';

const ChallengeBox = () => {
  const {  
    activeChallenge, 
    resetChallenge, 
    completeChallenge 
  } = useContext(ChallengesContext);

  const { resetContdown } = useContext(CountdownContext)
  
  function handleChallengeCompleted(){
    completeChallenge()
    resetContdown()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetContdown()
  }

  return (
    <div id='challengeBoxContainer'>
      { activeChallenge ? (
        <div id='challengeBoxActive'>
          <header>Get {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Get xp icon"/>
            <strong>New challenge</strong>
            <p>{activeChallenge.description} </p>
          </main>
          <footer>
            <button 
              type='button'
              id='challengeFailedButton'
              onClick={handleChallengeFailed}>
                Failed
            </button>
            <button 
              type='button'
              id='challengeCompletedButton'
              onClick={handleChallengeCompleted}>  
                Completed
            </button>
          </footer>
        </div>
      ) : (
      <div id="challengeBoxNotActive">
        <strong>Complete a cycle to receive challenges</strong>
        <p>
          <img src="icons/level-up.svg" alt="level up icon"/>
          Level up by completing challenges 
        </p>   
      </div>
      )}
      
    </div>
  )
}

export default ChallengeBox
