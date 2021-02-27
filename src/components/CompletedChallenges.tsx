import React, { useContext } from 'react'
import {ChallengesContext} from '../contexts/ChallengesContext'

const CompletedChallenges = () => {
  const {challengesCompleted} = useContext(ChallengesContext)

  return (
    <div id="completedChallengesContainer">
      <span>Completed challenges:</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export default CompletedChallenges
