import  {createContext, useState, ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'
import HowToUseModal from '../components/HowToUseModal'

import axios from 'axios'

import { connectToDatabase } from '../utils/dbConnect'

interface ChallengeProviderProps{
  children: ReactNode;
  user: string;
  userName: string;
  level: number
  currentExperience: number
  challengesCompleted: number
}

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData{
  user: string;
  userName: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: ()=>void;
  closeLevelUpModal: ()=>void;
  closeHowToUseModal: ()=>void;
  startNewChallenge: ()=>void;
  completeChallenge: ()=>void;
  resetChallenge: ()=>void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider( 
  { 
    children, 
    ...rest
}:ChallengeProviderProps){

  const [user, setUser] = useState(rest.user)
  const [userName, setUserName] = useState(rest.userName)
  const [level, setLevel] = useState(rest.level)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted)
  const experienceToNextLevel = Math.pow((level + 1) * 4,2)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(true)

  useEffect(()=>{
    Notification.requestPermission();
  },[])

  useEffect(()=>{
    updateDataBase()
  }, [currentExperience])

  function levelUp(){
    setLevel(level + 1)
    console.log(level)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function closeHowToUseModal(){
    setIsHowToUseModalOpen(false)
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random()* challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()
  }

  async function updateDataBase(){
    await axios.post('/api/updateUser',  {user, level, currentExperience, challengesCompleted }).catch(error =>{
      console.error(error);
    })
  }

  async function completeChallenge(){
    if(!activeChallenge) return;
    
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  return(
    <ChallengesContext.Provider value={{
      user,
      userName,
      level, 
      currentExperience,
      challengesCompleted,
      levelUp,
      closeLevelUpModal,
      closeHowToUseModal,
      experienceToNextLevel,
      startNewChallenge,
      activeChallenge,
      completeChallenge,
      resetChallenge,  
    }}>
      {children}
    {isLevelUpModalOpen && <LevelUpModal/>}
    {isHowToUseModalOpen && <HowToUseModal/>}
    </ChallengesContext.Provider>
  )
}