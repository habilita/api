import path from 'node:path'
import http from 'node:http'
import express from 'express'
import mongoose from 'mongoose'

import { Server } from 'socket.io'
import { router } from './router'

import { apiPort, mongoConnectionString } from './constants'

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

const runServer = () => server.listen(apiPort, () => {
  console.log(`✅ Servidor rodando em localhost:${apiPort}`)
})

mongoose.connect(mongoConnectionString)
  .then(() => {
    console.log('✅ Conectado ao mongodb.')
    runServer()
  })
  .catch(() => console.log('Erro ao conectar ao mongodb.'));
