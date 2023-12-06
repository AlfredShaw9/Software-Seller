// & Imports
import express from 'express'
import { register, login } from '../controllers/user_controller.js'
// import {} from '../controllers/bundle_controller.js'
// import secureRoute from './secureRoute.js'

// & Variables
const router = express.Router()

// & Routes
// * Authentication
router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

//  & Export
export default router