import { Request, Response } from 'express'

import { Survey } from '../../models/Survey'

export async function createSurvey(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      questions,
      category,
      maxMinutes,
    } = req.body

    const survey = await Survey.create({
      category,
      description,
      questions,
      maxMinutes,
      title,
    })

    res.status(201).json(survey)

  } catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
}
