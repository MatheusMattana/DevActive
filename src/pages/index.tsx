import {GetServerSideProps} from 'next';

import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import ChallengeBox from '../components/ChallengeBox';


import Head from  'next/head';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useContext } from 'react';

interface HomeProps{
  level: number
  currentExperience: number
  challengesCompleted: number
}


export default function Home(props:HomeProps) {

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      >
      <div id="container">
        <Head>
          <title>Helthy Dev</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges />
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
        </CountdownProvider>
      </div>
      <img src="/HealthyDevLogoFull.svg" alt="App Logo" id='appLogo'/>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return{
    props:{
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }
}
