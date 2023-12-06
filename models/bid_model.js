import mongoose from 'mongoose'

// & Bid schema
const bidSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  bundle: { type: mongoose.ObjectId, ref: 'Bundle', required: true },
  owner: { type: mongoose.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Bid', bidSchema)
