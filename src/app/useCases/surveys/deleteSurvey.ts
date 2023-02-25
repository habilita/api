import { Request, Response } from 'express'

import { Survey } from '../../models/Survey'

export async function deleteSurvey(req: Request, res: Response) {
  try {

    const { surveyId } = req.params

    await Survey.findByIdAndDelete(surveyId)

    res.sendStatus(204).json({
      msg: 'Prova deletada com sucesso.'
    })
  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
