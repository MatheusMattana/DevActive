import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import  axios from 'axios';

const login = () => {

  const [gitHubUser, setGitHubUser] = useState('')
  const router = useRouter();

  async function handleSubscription(){
    await axios.post('/api/subscribeUser', {gitHubUser}).then(response =>{
      response.data.ok ==  true ? 
        router.push({ pathname: '/', query: {user: gitHubUser}}) 
        : router.push({ pathname: '/login', query: {error: true}})
    })
  }

async function handleLogin(){
    event.preventDefault();
    try{
      await axios.get(`https://api.github.com/users/${gitHubUser}`)
      handleSubscription();
    }catch(e){
      router.push({ pathname: '/login', query: {error: 'notFound'}})
    }
  }

  return (
      <form onSubmit={handleLogin}>
        <input type="text" value={gitHubUser} onChange={e=> setGitHubUser(e.target.value)}/>
        <button type='submit'>login</button>
      </form>
  )
}

export default login
