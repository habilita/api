import { model, Schema, Types } from 'mongoose'

export enum Type {
  home = 'home',
  apartment = 'apartment',
  other = 'other',
}

export enum Destiny {
  rent = 'rent',
  sell = 'sell',
}

export interface House {
  type: Type
  destiny: Destiny
  contactName: string
  contactPhone: string
  contactEmail: string
  bedrooms: number
  bathrooms: number
  rooms: number
  houseCep: string
  houseCity: string
  houseNeighborhood: string
  houseDesiredValue: number
  houseComplement: string
  _id: Types.ObjectId
}

export const House = model('House', new Schema({
  type: {
    type: String,
    enum: Object.values(Type),
    required: true,
  },
  destiny: {
    type: String,
    enum: Object.values(Destiny),
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  houseCep: {
    type: String,
    required: true,
  },
  houseAddress: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  houseComplement: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    min: 1,
    required: true,
  },
  bathrooms: {
    type: Number,
    min: 1,
    required: true,
  },
  rooms: {
    type: Number,
    min: 1,
    required: true,
  },
}))
