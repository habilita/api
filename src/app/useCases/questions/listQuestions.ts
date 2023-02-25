import { Request, Response } from 'express'

import { Question } from '../../models/Question'

export async function listQuestions(req: Request, res: Response) {
  try {

    const questions = await Question.find()
    res.json(questions)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
