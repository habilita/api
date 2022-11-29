import jwt from 'jsonwebtoken'
import path from 'node:path'

import { Router, Request, Response, NextFunction } from 'express'
import multer from 'multer'

import { createCategorie } from './app/useCases/categories/createCategory'
import { listCategories } from './app/useCases/categories/listCategories'
import { createProduct } from './app/useCases/products/createProduct'
import { listProducts } from './app/useCases/products/listProducts'
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory'
import { listOrders } from './app/useCases/orders/listOrders'
import { createOrder } from './app/useCases/orders/createOrder'
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus'
import { cancelOrder } from './app/useCases/orders/cancelOrder'
import { deleteProduct } from './app/useCases/products/deleteProduct'
import { deleteCategory } from './app/useCases/categories/deleteCategory'
import { editProduct } from './app/useCases/products/editProduct'
import { registerUser } from './app/useCases/users/register'
import { loginUser } from './app/useCases/users/login'
import { secret } from './constants'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callBack) {
      callBack(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  })
})

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      msg: 'Acesso negado!'
    })
  }

  try {

    jwt.verify(token, secret)
    next()

  } catch(error) {
    res.status(400).json({
      msg: 'Token inválido'
    })
  }
}

// register user
router.post('/auth/register', registerUser)

// login user
router.post('/auth/user', loginUser)

// PRIVATE ROUTES

// list categories
router.get('/categories', listCategories)

// create category
router.post('/categories', checkToken, createCategorie)

// delete category
router.delete('/categories/:categoryId', checkToken, deleteCategory)

// list products
router.get('/products', listProducts)

// create product
router.post('/products', upload.single('image'), checkToken, createProduct)

// edit product
router.patch('/products', upload.single('image'), checkToken, editProduct)

// delete product
router.delete('/products/:productId', checkToken, deleteProduct)


// get products by categorie
router.get('/categories/:categoryId/products', listProductsByCategory)


// DASHBOARD
// list orders
router.get('/orders', checkToken, listOrders)

// create order
router.post('/orders', checkToken, createOrder)

// change order status
router.patch('/orders/:orderId', checkToken, changeOrderStatus)

// delete/cancel order
router.delete('/orders/:orderId', checkToken, cancelOrder)
