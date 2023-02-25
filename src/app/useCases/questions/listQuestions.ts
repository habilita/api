import { Response } from 'express'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'

import { Question } from '../../models/Question'

export async function listQuestions(req: AuthenticatedRequest, res: Response) {
  try {
    const questions = await Question.find()
    res.json(questions)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
