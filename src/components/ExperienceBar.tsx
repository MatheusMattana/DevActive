import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"

const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel} = useContext(ChallengesContext)
  const percentToNextLevel = Math.floor(currentExperience * 100)/experienceToNextLevel;

  return (
    <header id="experience-bar">
      <span>0 XP</span>
      <div>
        <div style={{width: `${percentToNextLevel}%`}}></div>
        <span id="currentExperience" style={{left: `${percentToNextLevel}%`}}>{currentExperience} XP</span>
      </div>
      <span>{experienceToNextLevel} XP</span>
    </header>
  )
}

export default ExperienceBar
