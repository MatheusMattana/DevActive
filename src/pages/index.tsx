import {GetServerSideProps} from 'next';

import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import ChallengeBox from '../components/ChallengeBox';
import axios from 'axios'

import { connectToDatabase } from '../utils/dbConnect'


import Head from  'next/head';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext'; 

interface HomeProps{
  userData: {
    gitHubUser: string,
    stats:{
      level: number,
      currentExperience: number,
      challengesCompleted: number
    }
  },
  userName: string
}


export default function Home(props:HomeProps) {
 
  return (
    <ChallengesProvider 
      user={props.userData.gitHubUser}
      userName={props.userName}
      level={props.userData.stats.level}
      currentExperience={props.userData.stats.currentExperience}
      challengesCompleted={props.userData.stats.challengesCompleted}
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

  const { db } = await connectToDatabase();

  async function getGitHubUserData(){
    let userNameReq
    try{
      await axios.get(`https://api.github.com/users/${String(ctx.query.user)}`).then(res =>{
        userNameReq = res.data.name
      })
      return userNameReq
    }catch(e){
      console.log(e)
    }
  }
  let userName

  if(typeof ctx.query.user != "string"){
    ctx.res.setHeader('Location', '/login')
    ctx.res.statusCode = 302;
    ctx.res.end();
  }else{
    userName = await getGitHubUserData()
  }

  const userDataResponse = await db.collection("developers").findOne({gitHubUser: String(ctx.query.user)})
  
  return{
    props:{
      userData: JSON.parse(JSON.stringify(userDataResponse)),
      userName: String(userName)
    }
  }
}
