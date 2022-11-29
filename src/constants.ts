import * as dotenv from 'dotenv'
dotenv.config()

export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017'
export const apiPort = process.env.API_PORT || 'mongodb://localhost:27017'
export const secret = process.env.SECRET || String(Math.random() ** Math.random())
