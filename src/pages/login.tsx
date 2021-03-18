import {GetServerSideProps} from 'next';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import  axios from 'axios';

import Head from 'next/head'

interface LoginProps{
  error: string
}

export default function login(props: LoginProps){

  const [gitHubUser, setGitHubUser] = useState('')
  const [hasError, setHasError] = useState(props.error)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    hasError === 'false' ? setHasError('false') : setHasError('true')
    hasError === 'databaseerror' ? setHasError('databaseerror')  : ''
  }, [hasError])
  
  const router = useRouter();


  async function handleSubscription(){
    try{
      await axios.post('/api/subscribeUser', {gitHubUser}).then(response =>{
        if(response.data.ok ==  true){
          router.push({ pathname: '/', query: {user: gitHubUser}}) 
        }
      })
    }catch{
      setIsLoading(false)
      setHasError('databaseerror')
      router.push({ pathname: '/login', query: {error: hasError}})
    }
  }

async function handleLogin(){
    event.preventDefault();
    try{
      setIsLoading(true)
      await axios.get(`https://api.github.com/users/${gitHubUser}`)
      handleSubscription();
    }catch(e){
      setHasError('true')
      setIsLoading(false)
      router.push({ pathname: 'login', query: {error: 'true'}})
    }
  }

  return (
    <div id='loginContainer'>
    <Head>
      <title>Login</title>
    </Head>
      <div id='loginFormContainer'>
        <img src="HealthyDevLogoFull.svg" alt=""/>
        <div id='loginInstructionContainer'>
          <img src={hasError === 'false' ? "icons/github-green.svg" : "icons/github-red.svg" } alt=""/>
          {hasError === 'false' && 
            <p>Log in with your Github username to get started</p>
          }
          {hasError ==='true' &&
            <p className='errorText'>Your username is not on Github, try again </p>
          }
          {hasError ==='databaseerror' &&
            <p className='errorText'>Error when trying to connect to databse. Try later</p>
          }
        </div>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            value={gitHubUser} 
            onChange={e=> setGitHubUser(e.target.value)}
            placeholder="ex: matheusmattana "
            required/>
          <button type='submit'>
            <img src="icons/left-arrow.svg" alt=""/>
          </button>
        </form>
      </div>
      {isLoading === true && 
      <div id='loadingScreen'>
        <img src="loading.gif"/>
      </div>
      } 
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{

  let error = ctx.query.error

  error == undefined ? error = 'false' : error = 'true' 

  return{
    props:{
      error
  }
  }
}
