import { model, Schema, Types } from 'mongoose'

export enum UserRole {
  admin = 'admin',
  realtor = 'realtor',
  user = 'user',
}

export interface User {
  name: string
  email: string
  password: string
  role: UserRole
  _id: Types.ObjectId
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
    default: UserRole.admin
  },
}))
