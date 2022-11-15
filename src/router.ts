import path from 'node:path'

import { Router } from 'express'
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

// list categories
router.get('/categories', listCategories)

// create category
router.post('/categories', createCategorie)

// list products
router.get('/products', listProducts)

// create product
router.post('/products', upload.single('image'), createProduct)


// get products by categorie
router.get('/categories/:categoryId/products', listProductsByCategory)


// DASHBOARD
// list orders
router.get('/orders', listOrders)

// create order
router.post('/orders', createOrder)

// change order status
router.patch('/orders/:orderId', changeOrderStatus)

// delete/cancel order
router.delete('/orders/:orderId', cancelOrder)
