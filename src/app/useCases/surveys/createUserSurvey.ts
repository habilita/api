import { Response } from 'express'
import { UserSurvey } from '../../models/UserSurvey'
import { Question } from '../../models/Question'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'

export async function createUserSurvey(req: AuthenticatedRequest, res: Response) {
  try {
    const {
      title,
      questions,
      category,
    } = req.body

    if (!questions) {
      res.status(401).json({
        message: 'Questions precisa estar preenchida.'
      })
      return
    }

    // Busca os IDs das questões que foram respondidas
    const questionsIds = questions.map((q: any) => q.question)

    // Busca as questões no banco de dados
    const dbQuestions = await Question.find({ _id: { $in: questionsIds } })

    if (dbQuestions.length === 0) {
      res.status(401).json({
        message: 'Id das questões inválidos ou não encontrados.'
      })
      return
    }

    // Calcula a quantidade total de questões
    const totalQuestions = dbQuestions.length

    // Calcula a quantidade de respostas corretas
    const correctAnswers = questions.reduce((acc: number, q: any) => {
      const dbQuestion = dbQuestions.find((dbq: any) => dbq._id == q.question)
      if (dbQuestion?.responses[q.userResponse].isCorrect) {
        return acc + 1
      }
      return acc
    }, 0)

    // Calcula a porcentagem de respostas corretas
    const percent = (correctAnswers / totalQuestions) * 100

    // Cria o objeto do UserSurvey e o salva no banco de dados
    const userSurvey = await UserSurvey.create({
      user: String(req.user?._id),
      title,
      questions: questions,
      percent,
      category,
    })

    // Retorna a resposta com o objeto criado
    res.status(201).json(userSurvey)

  } catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
}
