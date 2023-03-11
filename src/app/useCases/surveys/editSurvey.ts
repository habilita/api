import { Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'

import { Survey } from '../../models/Survey'
import { UserRole } from '../../models/User'

export async function editSurvey(req: AuthenticatedRequest, res: Response) {
  if (req.user?.role === UserRole.Admin) {
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

      if(!questionsIsEmpty) {
        let hasError = false
        questions.map((questionId: string, index: number) => {
          if (!isValidObjectId(String(questionId))) {
            res.status(400).json({ message: `ID da questão posição ${index} inválido.` })
            hasError = true
          }
        })
        if (hasError) {
          return
        }
      }

      const surveyDocument = await Survey.findOneAndUpdate(
        { _id }
        ,{
          ...(category && { category }),
          ...(description && { description }),
          ...(maxMinutes && { maxMinutes: Number(maxMinutes) }),
          ...(!questionsIsEmpty && { questions }),
          ...(title && { title }),
        })

      if (!surveyDocument) {
        res.status(404).json({ message: 'Prova não encontrada.' })
        return
      }

      res.status(201).json({
        success: 'Prova atualizada com successo.'
      })
      return

    } catch(error) {

      console.log(error)
      res.sendStatus(500)
      return
    }
  }
  res.status(401).json({ message: 'Apenas usuários administradores podem editar provas.' })
  return
}
