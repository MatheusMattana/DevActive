import { NowRequest, NowResponse} from '@vercel/node'
import { connectToDatabase } from '../../utils/dbConnect'

export default async (request: NowRequest, response: NowResponse) =>{
  const { user, level, currentExperience, challengesCompleted } = request.body

  const { db } = await connectToDatabase();

  await db.collection("developers").updateOne(
      { "gitHubUser": String(user)},
      { $set :{ "stats" : { 
        "level" : level, 
        "currentExperience": currentExperience,
        "challengesCompleted" : challengesCompleted
      }}}
  )

  response.status(201).json({ok: true})
}