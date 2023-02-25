import { Request, Response } from 'express'

import { Survey } from '../../models/Survey'

export async function editSurvey(req: Request, res: Response) {
  try {
    const {
      _id,
      category,
      description,
      questions,
      maxMinutes,
      title,
    } = req.body

    await Survey.findOneAndUpdate(
      { _id }
      ,{
        ...(category && { category }),
        ...(description && { description }),
        ...(questions && { questions: JSON.parse(questions) }),
        ...(maxMinutes && { maxMinutes: Number(maxMinutes) }),
        ...(title && { title: JSON.parse(title) }),
      })

    res.status(201).json({
      success: 'Updated success'
    })

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
