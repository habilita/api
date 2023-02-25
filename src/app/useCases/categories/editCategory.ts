import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { Category } from '../../models/Category'

export async function editCategory(req: Request, res: Response) {
  try {
    const {
      _id,
      name,
    } = req.body

    if (!isValidObjectId(_id)) {
      res.status(400).json({ message: 'ID da categoria inválido.' })
      return
    }

    const categoryDocument = await Category.findOneAndUpdate({ _id },{ name })

    if (!categoryDocument) {
      res.status(404).json({ message: 'Categoria não encontrada.' })
      return
    }

    res.status(201).json({
      success: 'Categoria atualizada com successo.'
    })

  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
