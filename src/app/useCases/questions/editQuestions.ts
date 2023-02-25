import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { Question } from '../../models/Question'

export async function editQuestion(req: Request, res: Response) {
  try {
    const {
      _id,
      category,
      responses,
      title,
    } = req.body

    if (!isValidObjectId(String(_id))) {
      res.status(400).json({ message: 'ID da questão inválido.' })
      return
    }

    if (category && !isValidObjectId(String(category))) {
      res.status(400).json({ message: 'ID da categoria inválido.' })
      return
    }

    const responsesIsEmpty = !responses || responses.length === 0

    const QuestionDocument = await Question.findOneAndUpdate(
      { _id }
      ,{
        ...(!responsesIsEmpty && { responses: JSON.parse(responses) }),
        ...(category && { category }),
        ...(title && { title }),
      })

    if (!QuestionDocument) {
      res.status(404).json({ message: 'Questão não encontrada.' })
      return
    }

    res.status(201).json({
      success: 'Questão atualizada com successo.'
    })

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
