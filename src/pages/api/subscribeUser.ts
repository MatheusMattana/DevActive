import { NowRequest, NowResponse} from '@vercel/node'
import { connectToDatabase } from '../../utils/dbConnect'

export default async (request: NowRequest, response: NowResponse) =>{
  const { gitHubUser } = request.body

  const { db } = await connectToDatabase();

    const search = await db.collection('developers').findOne({gitHubUser: gitHubUser})

    if(search == null){ 
      try{
        await db.collection('developers').insertOne({
          gitHubUser: gitHubUser, 
          stats: {
            level: 1, 
            currentExperience:0, 
            challengesCompleted:0
          }
        })
        return response.json({ok: true})
      } catch(e){
        console.log(e)
      }
    }else{
      return response.json({ok:true})
    }
}
