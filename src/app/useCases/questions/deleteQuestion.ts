import { Request, Response } from 'express'

import { Question } from '../../models/Question'

export async function deleteQuestion(req: Request, res: Response) {
  try {

    const { QuestionId } = req.params

    await Question.findByIdAndDelete(QuestionId)

    res.sendStatus(204).json({
      msg: 'Questiona deletada com sucesso'
    })
  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
