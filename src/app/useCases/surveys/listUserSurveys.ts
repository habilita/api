import { Response } from 'express'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'
import { UserSurvey } from './../../models/UserSurvey'

export async function listUserSurvey(req: AuthenticatedRequest, res: Response) {
  try {

    // Busca as surveys do usuário no banco de dados
    const dbUserSurveys = await UserSurvey
      .find({ user: { $in: String(req.user?._id) } })
      .populate('questions.question')

    res.json(dbUserSurveys)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
