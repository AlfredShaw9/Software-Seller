// & Imports
// import secureRoute from './secureRoute.js'
import express from 'express'
import { register, login } from '../controllers/user_controller.js'
import {
  getAllBundles,
  createBundles,
  getSingleBundle,
  updateBundle,
  deleteBundle
} from '../controllers/bundle_controller.js'

// & Variables
const router = express.Router()

// & Routes
// * Bundles
router.route('/bundles')
  .get(getAllBundles)
  .post(createBundles)

router.route('/bundles/bundleId')
  .get(getSingleBundle)
  .put(updateBundle)
  .delete(deleteBundle)


// * Authentication
router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

//  & Export
export default router