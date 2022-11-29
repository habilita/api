import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../models/User'

export const registerUser = async (req: Request, res: Response) => {

  const { name, email, password, confirmpassword } = req.body

  if (!name) {
    return res.status(422).json({ msg: 'name é obrigatório.' })
  }
  if (!email) {
    return res.status(422).json({ msg: 'email é obrigatório.' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'password é obrigatório.' })
  }
  if (!confirmpassword) {
    return res.status(422).json({ msg: 'confirmpassword é obrigatório.' })
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'confirmpassword precisa ser igual a password.' })
  }

  const userExists = await User.findOne({ email })

  // check if user exists
  if (userExists) {
    return res.status(422).json({ msg: 'Utilize outro email.' })
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // create user
  const user = new User({
    name,
    email,
    password: passwordHash
  })

  try {

    await user.save()

    res.status(201).json(
      {
        msg: 'Usuário criado com sucesso!'
      }
    )

  } catch(error) {

    console.log(error)

    res.status(500).json(
      {
        msg: 'Erro interno no servidor. Tente novamente mais tarde.'
      }
    )
  }

}
