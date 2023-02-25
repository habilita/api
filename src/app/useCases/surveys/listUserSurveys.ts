import { Request, Response } from 'express'
import { UserSurvey } from './../../models/UserSurvey'

export async function listUserSurvey(req: Request, res: Response) {
  try {
    const surveys = await UserSurvey.find().populate('questions.question')
    res.json(surveys)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
