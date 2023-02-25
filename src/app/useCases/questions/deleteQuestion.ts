import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Question } from '../../models/Question'

export async function deleteQuestion(req: Request, res: Response): Promise<void> {
  try {
    const id = req.query.id as string

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'ID da questão inválida.' })
      return
    }

    const QuestionDocument = await Question.findByIdAndDelete(id)
    if (!QuestionDocument) {
      res.status(404).json({ message: 'Questão não encontrada.' })
      return
    }

    res.status(201).json({ message: 'Questão deletada com sucesso.' })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
