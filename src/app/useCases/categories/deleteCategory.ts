import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Category } from '../../models/Category'

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  try {
    const id = req.query.id as string

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'ID da categoria inválido.' })
      return
    }

    const categorydDocument = await Category.findByIdAndDelete(id)
    if (!categorydDocument) {
      res.status(404).json({ message: 'Categoria não encontrada.' })
      return
    }

    res.status(201).json({ message: 'Categoria deletada com sucesso.' })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
