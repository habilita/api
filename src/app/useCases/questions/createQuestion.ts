import { Request, Response } from 'express'

import { Question } from '../../models/Question'

export async function createQuestion(req: Request, res: Response) {
  try {

    const question = await Question.create(req.body)
    res.json(question)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
