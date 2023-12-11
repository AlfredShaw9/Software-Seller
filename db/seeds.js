// & Import data
import userData from './data/user_data.js'
import bundleData from './data/bundle_data.js'
import bundleDataHist from './data/bundle_data_historic.js'
import reviewData from './data/review_data.js'
import bidData from './data/bid_data.js'

// & Import package
import mongoose from 'mongoose'

// & Import dotenv
import 'dotenv/config'
const connectionString = process.env.CONNECTION_STRING

// & Import models
import User from '../models/user_model.js'
import Bundle from '../models/bundle_model.js'
import Review from '../models/review_model.js'
import Bid from '../models/bid_model.js'

// & Function
async function seed(){
  try {
    // Connect to db
    await mongoose.connect(connectionString)
    console.log('🤝 Successfully connected to database')

    // Delete entries
    const { deletedCount } = await User.deleteMany()
    console.log(`💀 Successfully deleted ${deletedCount} users from db`)

    const deletedBundles = await Bundle.deleteMany()
    console.log(`🪟 Successfully deleted ${deletedBundles.deletedCount} bundles from db`)
    
    const deletedReviews = await Review.deleteMany()
    console.log(`🤫 Successfully deleted ${deletedReviews.deletedCount} reviews from db`)
    
    const deletedBids = await Bid.deleteMany()
    console.log(`💸 Successfully deleted ${deletedBids.deletedCount} bids from db`)

    // Create from seed data
    const createdUsers = await User.create(userData)
    console.log(`🐣 Created ${createdUsers.length} users in db`)

    const ownedBundles = bundleData.map(bundle => {
      const rdmUserIdx = Math.floor(Math.random() * createdUsers.length)
      const nowDate = Date.now()
      const rdmDuration = Math.floor(Math.random() * 1000 * 60 * 60 * 24)
      const rdmTime = new Date(nowDate + rdmDuration)
      return { ...bundle, owner: createdUsers[rdmUserIdx]._id, auctionEnd: rdmTime }
    })

    // Historic bundles will always be owned by the 3rd user
    const ownedHistBundles = bundleDataHist.map(bundle => {
      const nowDate = Date.now()
      return { ...bundle, owner: createdUsers[2]._id }
    })

    const histBundlesCreated = await Bundle.create(ownedHistBundles)
    console.log(`💾 Created ${ownedHistBundles.length} historic bundles in db`)

    const bundlesCreated = await Bundle.create(ownedBundles)
    console.log(`💾 Created ${ownedBundles.length} bundles in db`)

    const ownedReviews = reviewData.map(review => {
      const rdmUserIdx = Math.floor(Math.random() * createdUsers.length)
      return { ...review, author: createdUsers[rdmUserIdx]._id}
    })
    const reviewsCreated = await Review.create(ownedReviews)
    console.log(`📝 Created ${ownedReviews.length} reviews in db`)
    
    // * Create bidData array using loop instead of from manual seed file
    let bidArray = []
    function bidArrayBuilder() {
      for (let i = 0; i <= 200; i++){
        const rdmBid = Math.floor(Math.random() * 51)
        const obj = {
          value: rdmBid
        }
        return bidArray.push(obj)
      }
    }
    bidArrayBuilder()
    console.log('Bid array: ', bidArray)

    // * Attempting to use bidArray from above rather than bidData seed file
    const ownedBids = bidData.map(bid => {
      const rdmUserIdx = Math.floor(Math.random() * createdUsers.length)
      // First bundle won't have any votes
      const rdmBundleIdx = 1 + Math.floor(Math.random() * ownedBundles.length - 1)
      return { ...bid, owner: createdUsers[rdmUserIdx]._id, bundle: bundlesCreated[rdmBundleIdx]._id}
    })
    const bidsCreated = await Bid.create(ownedBids)
    console.log(`💰 Created ${ownedBids.length} bids in db`)

    // Close connection
    await mongoose.connection.close()
    console.log('🚪 Connection closed')

  } catch (error) {
    console.log(error)
  }
}
seed()