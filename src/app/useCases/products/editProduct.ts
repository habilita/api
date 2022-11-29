import { Request, Response } from 'express'

import { Product } from '../../models/Product'

export async function editProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename
    const { _id, name, description, price, category, ingredients } = req.body

    await Product.findOneAndUpdate(
      { _id }
      ,{
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: Number(price) }),
        ...(category && { category }),
        ...(imagePath && { imagePath }),
        ...(ingredients && { ingredients: JSON.parse(ingredients) }),
      })

    res.status(201).json({
      success: 'Updated success'
    })

  } catch(error) {

    console.log(error)
    res.sendStatus(500)

  }
}
