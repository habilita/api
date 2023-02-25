import { Request, Response } from 'express'

import { Survey } from '../../models/Survey'

export async function listSurveys(req: Request, res: Response) {
  try {

    const surveys = await Survey.find().populate('questions')
    res.json(surveys)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
