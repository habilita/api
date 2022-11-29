import * as dotenv from 'dotenv'
dotenv.config()

export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://carlosgizbert:ricoem2030@cardapio.pvb6pbs.mongodb.net/?retryWrites=true&w=majority'
export const apiPort = process.env.API_PORT || '3001'
export const secret = process.env.SECRET || String(Math.random() ** Math.random())
