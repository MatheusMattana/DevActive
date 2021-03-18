import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {ChallengesContext} from '../contexts/ChallengesContext'

interface CountdownContextData{
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startContdown: ()=> void
  resetContdown: ()=> void  
}

interface CountdownProviderProps{
  children: ReactNode;
}

export const CountdownContext = createContext({} as  CountdownContextData)

export function  CountdownProvider({children}: CountdownProviderProps){
  const { startNewChallenge,levelUp  } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.05 * 60)

  const minutes = Math.floor(time/60);
  const seconds = time % 60

  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  let countdownTimeout: NodeJS.Timeout;

  function startContdown(){
    setIsActive(true);
  }

  function resetContdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60)
    setHasFinished(false)
  }

  useEffect(()=>{
    if(isActive && time > 0){    
      countdownTimeout = setTimeout(()=>{
        setTime(time - 1);
      }, 1000)
    }else if(isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startContdown,
      resetContdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}