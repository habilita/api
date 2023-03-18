import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

import { User } from '../../models/User'

import { CLIENTS_ID_GOOGLE, secret } from '../../../constants'

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, googleToken } = req.body

  if (!googleToken) {
    if (!email) {
      return res.status(422).json({ msg: 'email é obrigatório.' })
    }
    if (!password) {
      return res.status(422).json({ msg: 'password ou googleToken é obrigatório.' })
    }
  }

  let user
  if (googleToken) {
    // Verify Google token
    const client = new OAuth2Client(CLIENTS_ID_GOOGLE.api)
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: [CLIENTS_ID_GOOGLE.ios, CLIENTS_ID_GOOGLE.android],
    })
    const payload = ticket.getPayload()
    const email = payload?.email
    user = await User.findOne({ email })

    if (!user) {
      return res.status(422).json({ msg: 'Usuário não encontrado.' })
    }
  } else {
    // Check if user exists and password matches
    user = await User.findOne({ email })
    if (!user) {
      return res.status(422).json({ msg: 'Usuário não encontrado.' })
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(404).json({ msg: 'Senha inválida.' })
    }
  }

  try {
    const token = jwt.sign({
      userId: user._id,
    }, secret
    )

    res.status(200).json({
      msg: 'Autenticação realizada com sucesso',
      token,
      type: 'bearer'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      msg: 'Erro interno no servidor. Tente novamente mais tarde.'
    })

  }
}
