import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

const LevelUpModal = () => {

  const {level, closeLevelUpModal} = useContext(ChallengesContext)

  new Audio('/level-up.mp3').play()

  return (
    <div id="levelUpModalOverlay">
      <div id="levelUpModalContainer">
        <header>{level}</header>
        <strong>Congratulations</strong>
        <p>You have reached a new level!</p>
        <button type='button' onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Close modal"/>
        </button>
      </div>
    </div>
  )
}

export default LevelUpModal
