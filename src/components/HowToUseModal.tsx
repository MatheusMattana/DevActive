import React, {useContext} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

const howToUseModal = () => {
  const {closeHowToUseModal} = useContext(ChallengesContext)

  return (
    <div id="howToUseModalOverlay">
      <div id="howToUseModalContainer">
        <h1>Welcome</h1>
        <p>To use the app you must first start a new Pomodoro cycle and work as focused as you can.</p>
        <p>After the cycle is over you will receive a challenge.</p>
        <p>If you manage to fulfill it you will gain experience and level up.</p>
        <p>After that, try not to stay longer than 5 minutes without starting a new cycle. </p>
        <p>Happy coding!</p>
        <button type='button' onClick={closeHowToUseModal}>
          Got it!
        </button>
      </div>
    </div>

  )
}

export default howToUseModal
