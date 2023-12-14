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
async function seedOngoing(){
  try {
    // Connect to db
    await mongoose.connect(connectionString)
    console.log('🤝 Successfully connected to database')

    // Won't delete any entries

    // Create from seed data
    const createdUsers = await User.find()
    console.log(`🐣 Found ${createdUsers.length} users in db`)

    const ownedBundles = bundleData.map(bundle => {
      const rdmUserIdx = Math.floor(Math.random() * createdUsers.length)
      const nowDate = Date.now()
      const rdmDuration = Math.floor(Math.random() * 1000 * 60 * 60 * 24)
      const rdmTime = new Date(nowDate + rdmDuration)
      return { ...bundle, owner: createdUsers[rdmUserIdx]._id, auctionEnd: rdmTime }
    })

    const bundlesCreated = await Bundle.create(ownedBundles)
    console.log(`💾 Created ${ownedBundles.length} bundles in db`)

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
seedOngoing()