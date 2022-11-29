import path from 'node:path'
import http from 'node:http'
import { Server } from 'socket.io'

import express from 'express'
import mongoose from 'mongoose'

import { router } from './router'

const API_PORT = 3001
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017'

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
  res.setHeader('Access-Control-Allow-Methods', '*'),
  res.setHeader('Access-Control-Allow-Headers', '*'),
  next()
})

app.use(express.json())
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(router)

const runServer = () => server.listen(API_PORT, () => {
  console.log(`✅ Servidor rodando em   localhost:${API_PORT}`)
})

mongoose.connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('✅ Conectado ao mongodb.')
    runServer()
  })
  .catch(() => console.log('Erro ao conectar ao mongodb.'))
