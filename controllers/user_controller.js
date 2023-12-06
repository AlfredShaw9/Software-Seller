// & Imports
import user_model from "../models/user_model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// & REGISTER
export const register = async (req, res) => {
  try {
    const userToCreate = await User.create(req.body)
    console.log(userToCreate)
    return res.status(201).json({ message: `Welcome ${userToCreate.username}`})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: `Registration unsuccessful`})
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
    const token = jwt.sign({ sub: userToLogin._id, username: userToLogin.username}, process.env.SECRET)
    console.log(token)
    return res.json({message: `Welcome back ${userToLogin.usename}`, token: token})
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: `Unauthorized`})
  }
}