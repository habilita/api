import path from 'node:path'

import express from 'express'
import mongoose from 'mongoose'

import { router } from './router'

const app = express()

app.use(express.json())
app.use(router)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const API_PORT = 3001
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017'

const runServer = () => app.listen(API_PORT, () => {
  console.log(`✅ Servidor rodando em   localhost:${API_PORT}`)
})

mongoose.connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('✅ Conectado ao mongodb.')
    runServer()
  })
  .catch(() => console.log('Erro ao conectar ao mongodb.'))
