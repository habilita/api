import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { secret } from '../../constants'
import { User } from '../models/User'

interface AuthenticatedRequest extends Request {
  user?: User
}

export async function checkToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      msg: 'Acesso negado!'
    })
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: string }
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    req.user = user
    next()

  } catch(error) {
    res.status(400).json({
      msg: 'Token inválido'
    })
  }
}
