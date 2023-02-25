import { Request, Response } from 'express'

import { UserSurvey } from '../../models/UserSurvey'

export async function createUserSurvey(req: Request, res: Response) {
  try {
    const {
      user,
      title,
      questions,
      percent,
      category,
    } = req.body

    const userSurvey = await UserSurvey.create({
      user,
      title,
      questions: questions,
      percent: Number(percent),
      category,
    })

    res.status(201).json(userSurvey)

  } catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
}
