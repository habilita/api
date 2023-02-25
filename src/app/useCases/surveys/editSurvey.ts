import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { Survey } from '../../models/Survey'

export async function editSurvey(req: Request, res: Response) {
  try {
    const {
      _id,
      category,
      description,
      maxMinutes,
      questions,
      title,
    } = req.body

    if (!isValidObjectId(String(_id))) {
      res.status(400).json({ message: 'ID da prova inválido.' })
      return
    }

    const questionsIsEmpty = !questions || questions.length === 0

    const surveyDocument = await Survey.findOneAndUpdate(
      { _id }
      ,{
        ...(category && { category }),
        ...(description && { description }),
        ...(maxMinutes && { maxMinutes: Number(maxMinutes) }),
        ...(!questionsIsEmpty && { questions: JSON.parse(questions) }),
        ...(title && { title }),
      })

    if (!surveyDocument) {
      res.status(404).json({ message: 'Prova não encontrada.' })
      return
    }

    res.status(201).json({
      success: 'Prova atualizada com successo.'
    })

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
