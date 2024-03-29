import { Router } from 'express'
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
  deleteQuestion,
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

import { editCategory } from './app/useCases/categories/editCategory'
import { editQuestion } from './app/useCases/questions/editQuestions'

import { checkToken } from './app/middlewares'

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

// edit question
router.patch('/questions', checkToken, editQuestion)

// delete question
router.delete('/questions', checkToken, deleteQuestion)

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
