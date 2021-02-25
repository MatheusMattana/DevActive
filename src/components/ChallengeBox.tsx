import React, {useContext, useState} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

const ChallengeBox = () => {
  const {  activeChallenge, resetChallenge } = useContext(ChallengesContext);
  
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
              onClick={resetChallenge}>
                Failed
            </button>
            <button 
              type='button'
              id='challengeCompletedButton'>
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
