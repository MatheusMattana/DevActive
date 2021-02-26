import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"


const Profile = () => {

  const { level } = useContext(ChallengesContext)

  return (
    <div id='profileContainer'>
      <img src="https://github.com/matheusmattana.png" alt="Matheus Mattana"/>
      <div>
        <strong>Matheus Mattana</strong>
        <p>
          <img src="icons/level.svg" alt="Level up"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
