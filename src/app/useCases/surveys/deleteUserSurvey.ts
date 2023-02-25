import { Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'
import { UserSurvey } from '../../models/UserSurvey'

export async function deleteUserSurvey(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = req.query.id as string

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'ID de Prova do usuário inválido.' })
      return
    }

    const userSurveyDocument = await UserSurvey.findByIdAndDelete(id)
    if (!userSurveyDocument) {
      res.status(404).json({ message: 'Prova do usuário não encontrado.' })
      return
    }

    res.status(201).json({ message: 'Prova do usuário deletado com sucesso.' })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
