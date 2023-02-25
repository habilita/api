import { model, Schema } from 'mongoose'

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  name: string
  email: string
  password: string
  role: UserRole
}

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.User
  },
}))
