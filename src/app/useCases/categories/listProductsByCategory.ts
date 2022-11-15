import { Request, Response } from 'express'

import { Product } from '../../models/Product'

export async function listProductsByCategory(req: Request, res: Response) {
  try {

    const idCategory = req.params.categoryId

    const productsByCategoryId =
      await Product.find().where('category').equals(idCategory)

    res.json(productsByCategoryId)

  } catch(error) {

    // console.log(error)
    res.sendStatus(500)

  }
}
