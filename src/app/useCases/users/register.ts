import { Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../models/User'
import { AuthenticatedRequest } from '../../interfaces/Authenticated'

export const registerUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, confirmpassword } = req.body

  // Verificar se todos os campos obrigatórios foram preenchidos
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório.' })
  }
  if (!email) {
    return res.status(422).json({ msg: 'O e-mail é obrigatório.' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória.' })
  }
  if (!confirmpassword) {
    return res.status(422).json({ msg: 'A confirmação de senha é obrigatória.' })
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'A confirmação de senha precisa ser igual à senha.' })
  }

  // Verificar se o usuário já existe
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(422).json({ msg: 'Este e-mail já está sendo utilizado.' })
  }

  // Criar a senha do usuário
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // Criar o usuário
  const user = new User({
    name,
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({ msg: 'Usuário criado com sucesso!' })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.' })
  }
}
