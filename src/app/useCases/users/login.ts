import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../../models/User'
import { secret } from '../../../constants'

export const loginUser = async (req: Request, res: Response) => {

  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({ msg: 'email é obrigatório.' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'password é obrigatório.' })
  }

  // check if user exists
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(422).json({ msg: 'Usuário não encontrado.' })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(404).json({ msg: 'Senha inválida.' })
  }

  try {
    const token = jwt.sign({
      userId: user._id,
    },
    secret
    )

    res.status(200).json({
      msg: 'Autenticação realizada com sucesso',
      token,
      type: 'bearer'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      msg: 'Erro interno no servidor. Tente novamente mais tarde.'
    })

  }

}
