import mongoose from 'mongoose'

// & review schema
const reviewSchema = new mongoose.Schema({
  description: { type: String, required: true, minLength: 5, maxLength: 300 },
  rating: { type: Number, required: true, min: 0, max: 10 },
  author: { type: mongoose.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Review', reviewSchema)
