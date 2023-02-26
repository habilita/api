import { UserRole } from './../../models/User'
import { Response } from 'express'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'

import { Survey } from '../../models/Survey'

export async function createSurvey(req: AuthenticatedRequest, res: Response) {
  const {
    title,
    description,
    questions,
    category,
    maxMinutes,
  } = req.body

  if (req.user?.role === UserRole.Admin) {
    try {
      const survey = await Survey.create({
        category,
        description,
        questions,
        maxMinutes,
        title,
      })
      res.status(201).json(survey)
      return

    } catch(error) {
      console.log(error)
      res.sendStatus(500)
      return
    }
  }

  res.status(401).json({ message: 'Apenas usuários administradores podem cadastrar provas.'})
  return
}
