import { Request } from 'express'
import { User } from '../models/User'

export interface AuthenticatedRequest extends Request {
  userId?: string
  user?: User
}
