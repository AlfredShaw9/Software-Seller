import mongoose from 'mongoose'

// & Bundle schema
const bundleSchema = new mongoose.Schema({
  software: { type: String, required: true },
  version: { type: String, required: true },
  operatingSystem: { type: String, required: true },
  releaseYear: Number,
  description: String,
  image: String,
  startPrice: Number,
  auctionEnd: Date,
  owner: { type: mongoose.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Bundle', bundleSchema)

