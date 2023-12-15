import mongoose from 'mongoose'

// & Bid schema
const bidSchema = new mongoose.Schema({
  value: { type: Number, required: true, max: 1000000000 },
  bundle: { type: mongoose.ObjectId, ref: 'Bundle', required: true },
  owner: { type: mongoose.ObjectId, ref: 'User', required: true },
})


// * Allow virtuals
bidSchema
  .set('toJSON',{
    virtuals: true,
})



export default mongoose.model('Bid', bidSchema)
