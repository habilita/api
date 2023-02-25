import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { secret } from '../../constants'

interface AuthenticatedRequest extends Request {
  userId?: string
}

export function checkToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      msg: 'Acesso negado!'
    })
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: string }
    req.userId = decoded.userId
    next()

  } catch(error) {
    res.status(400).json({
      msg: 'Token inválido'
    })
  }
}
