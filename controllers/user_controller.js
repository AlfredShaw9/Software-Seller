// & Imports
import User from '../models/user_model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// & REGISTER
export const register = async (req, res) => {
  try {
    const userToCreate = await User.create(req.body)
    console.log(userToCreate)
    return res.status(201).json({ message: `Welcome ${userToCreate.username}` })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Registration unsuccessful' })
  }
}

// & LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    if (!userToLogin || !bcrypt.compareSync(req.body.password, userToLogin.password)){
      throw new Error(!userToLogin ? 'Email not found' : 'Passwords don\'t match')
    }
    const token = jwt.sign({ sub: userToLogin._id, username: userToLogin.username }, process.env.SECRET)
    console.log(token)
    return res.status(202).json({ message: `Welcome back ${userToLogin.username}`, token: token })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}