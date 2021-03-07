import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"


const Profile = (props) => {

  const { userName, level, user } = useContext(ChallengesContext)

  return (
    <div id='profileContainer'>
      <img src={`https://github.com/${user}.png`} alt="Matheus Mattana"/>
      <div>
        <strong>{userName}</strong>
        <p>
          <img src="icons/level.svg" alt="Level up"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
