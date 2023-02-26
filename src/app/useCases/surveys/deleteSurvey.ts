import { Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'
import { Survey } from '../../models/Survey'
import { UserRole } from '../../models/User'

export async function deleteSurvey(req: AuthenticatedRequest, res: Response): Promise<void> {

  if (req.user?.role === UserRole.Admin) {
    try {
      const id = req.query.id as string

      if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'ID da prova inválido.' })
        return
      }

      const surveyDocument = await Survey.findByIdAndDelete(id)
      if (!surveyDocument) {
        res.status(404).json({ message: 'Prova não encontrada.' })
        return
      }

      res.status(201).json({ message: 'Prova deletada com sucesso.' })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
  res.status(400).json({ message: 'Apenas usuários administradores podem deletar uma prova.' })
  return
}
