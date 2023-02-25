import { Router, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import path from 'node:path'
import multer from 'multer'

import {
  loginUser,
  registerUser
} from './app/useCases/users'

import {
  createCategorie,
  deleteCategory,
  listCategories,
  listProductsByCategory,
} from './app/useCases/categories'

import {
  createQuestion,
  listQuestions,
} from './app/useCases/questions'

import {
  createSurvey,
  createUserSurvey,
  deleteSurvey,
  deleteUserSurvey,
  editSurvey,
  listSurveys,
  listUserSurvey,
} from './app/useCases/surveys'
import { secret } from './constants'
import { editCategory } from './app/useCases/categories/editCategory'

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

// edit category
router.put('/categories', checkToken, editCategory)

// delete category
router.delete('/categories', checkToken, deleteCategory)

// get products by categorie
router.get('/categories/:categoryId/products', listProductsByCategory)

// QUESTIONS
// list questions
router.get('/questions', checkToken, listQuestions)

// create question
router.post('/questions', checkToken, createQuestion)

// SURVEYS
// list surveys
router.get('/surveys', checkToken, listSurveys)

// create survey
router.post('/surveys', checkToken, createSurvey)

// edit survey
router.patch('/surveys', checkToken, editSurvey)

// delete survey
router.delete('/surveys', checkToken, deleteSurvey)


// // edit survey
// router.patch('/surveys/:surveyId'', checkToken, editSurvey)

// // change survey status
// router.patch('/surveys/:surveyId', changeSurveyStatus)

// USER SURVEYS
// create user survey
router.post('/user/surveys', checkToken, createUserSurvey)

// list user survey
router.get('/user/surveys', checkToken, listUserSurvey)

// delete user survey
router.delete('/user/surveys', checkToken, deleteUserSurvey)
