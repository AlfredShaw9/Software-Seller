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
  owner: { type: mongoose.ObjectId, ref: 'User', required: true }
})

// * Allow virtuals
bundleSchema
  .set('toJSON',{
    virtuals: true
})

// * Virtual field for bids
bundleSchema
  .virtual('bids', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle'
  })

// * Get max bid from bundleSchema's bids array
bundleSchema
  .virtual('maxBid', {

  })
  .get(function(bids){
    if(!this.bids?.length) return 'No bids yet'
    return (Math.max(this.bids))
  })


export default mongoose.model('Bundle', bundleSchema)

