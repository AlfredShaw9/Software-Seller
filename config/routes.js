// & Imports
// import secureRoute from './secureRoute.js'
import express from 'express'
import { register, login } from '../controllers/user_controller.js'
import secureRoute from './secure_route.js'
import {
  getAllBundles,
  getActiveBundles,
  createBundle,
  getSingleBundle,
  updateBundle,
  deleteBundle,
  getSoldBundles
} from '../controllers/bundle_controller.js'
import {
  getAllBids,
  createBid,
  getSingleBid,
  updateBid,
  deleteBid,
  getOwnBids
} from '../controllers/bid_controller.js'
import {
  getAllReviews,
  createReview,
  getSingleReview,
  deleteReview
} from '../controllers/review_controller.js'

// & Variables
const router = express.Router()

// & Routes
// * Bundles
router.route('/bundles')
  .get(getAllBundles)
  .post(secureRoute, createBundle)

router.route('/bundles/active')
  .get(getActiveBundles)

router.route('/bundles/:bundleId')
  .get(getSingleBundle)
  .put(secureRoute, updateBundle)
  .delete(secureRoute, deleteBundle)
  .post(secureRoute, createBid)

// ! WIP
// * User specific bundles
router.route('/bought')
  .get(secureRoute, getAllBundles)

router.route('/sold')
  .get(secureRoute, getSoldBundles)
// ! Down to here

// * Bids
router.route('/bundles/:bundleId/bids')
  .get(getAllBids)
  // .post(secureRoute, createBid)

router.route('/bundles/:bundleId/bids/:bidId')
  .get(getSingleBid)
  .put(secureRoute, updateBid)
  .delete(secureRoute, deleteBid)

// * User specific bids
router.route('/ownbids')
  .get(secureRoute, getOwnBids)

  // * Reviews
router.route('/reviews')
  .get(getAllReviews)
  .post(secureRoute, createReview)

// router.route('/reviews/:reviewId')
//   .get(getSingleReview)
//   .put(secureRoute, updateReview)
//   .delete(secureRoute, deleteReview)

// * Authentication
router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

//  & Export
export default router