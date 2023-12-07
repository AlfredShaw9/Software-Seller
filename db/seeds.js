// & Import data
import userData from './data/user_data.js'
import bundleData from './data/bundle_data.js'

// & Import package
import mongoose from 'mongoose'

// & Import dotenv
import 'dotenv/config'
const connectionString = process.env.CONNECTION_STRING

// & Import models
import User from '../models/user_model.js'
import Bundle from '../models/bundle_model.js'

// & Function
async function seed(){
  try {
    // Connect to db
    await mongoose.connect(connectionString)
    console.log('🤝 Successfully connected to database')

    // Delete entries
    const { deletedCount } = await User.deleteMany()
    console.log(`💀 Successfully deleted ${deletedCount} users from db`)

    const { deletedCount: deletedBundleCount } = await Bundle.deleteMany()
    console.log(`🪟 Successfully deleted ${deletedCount} bundles from db`)

    // Create from seed data
    const createdUsers = await User.create(userData)
    console.log(`🐣 Created ${createdUsers.length} users in db`)

    const ownedBundles = bundleData.map(bundle => {
      const rdmUserIdx = Math.floor(Math.random() * createdUsers.length)
      return { ...bundle, owner: createdUsers[rdmUserIdx]._id }
    })
    console.log(`💾 Created ${ownedBundles.length} bundles in db`)

    // Close connection
    await mongoose.connection.close()
    console.log('🚪 Connection closed')

  } catch (error) {
    console.log(error)
  }
}
seed()