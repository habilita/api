import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Survey } from '../../models/Survey'

export async function deleteSurvey(req: Request, res: Response): Promise<void> {
  try {
    const id = req.query.id as string

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'ID de documento inválido.' })
      return
    }

    const surveyDocument = await Survey.findByIdAndDelete(id)
    if (!surveyDocument) {
      res.status(404).json({ message: 'Documento não encontrado.' })
      return
    }

    res.status(201).json({ message: 'Documento deletado com sucesso.' })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
