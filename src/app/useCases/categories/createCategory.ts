import { Request, Response } from 'express'

import { Category } from '../../models/Category'

export async function createCategorie(req: Request, res: Response) {
  try {

    const category = await Category.create(req.body)
    res.json(category)

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
