import { model, Schema, Types } from 'mongoose'

export interface Realtor {
  name: string
  phone: string
  email: string
  cep: string
  uf: string
  city: string
  _id: Types.ObjectId
}

export const Realtor = model('Realtor', new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  creciUf: {
    type: String,
    required: true,
  },
  creciNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
}))
