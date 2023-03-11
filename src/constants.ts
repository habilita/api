import * as dotenv from 'dotenv'
dotenv.config()

export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || ''
export const apiPort = process.env.API_PORT || '3000'
export const secret = process.env.SECRET || String(Math.random() ** Math.random())
