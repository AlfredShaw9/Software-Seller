import mongoose from 'mongoose'

// & Bundle schema
const bundleSchema = new mongoose.Schema({
  software: { type: String, required: true },
  version: { type: String, required: true },
  operatingSystem: { type: String, required: true },
  releaseYear: Number,
  description: String,
  image: String,
  startPrice: { type: Number, required: true, min: 1 },
  auctionEnd: { type: Date, required: true },
  owner: { type: mongoose.ObjectId, ref: 'User', required: true }
})

// * Allow virtuals
bundleSchema
  .set('toJSON',{
    virtuals: true,
})

// * Virtual field for maxBid
bundleSchema
  .virtual('winDetails', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle',
  })
  .get(function(bids){
    if (bids == '') {
      return { maxBid: 0, winner: 'No one bid :(' }
    } else {
      return { maxBid: bids?.sort((a, b) => a.value - b.value)[bids.length - 1].value, winner: bids?.sort((a, b) => a.value - b.value)[bids.length - 1].owner }
    }
  })


// * Virtual field for bids
bundleSchema
  .virtual('bids', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle',
  })

// * Virtual field for winningBid
bundleSchema
  .virtual('winner', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle',
  })
  .get(function(bids){
    if (bids == '') {
      return 
    } else {
      return bids?.sort((a, b) => a.value - b.value)[bids.length - 1].owner
    }
  })

export default mongoose.model('Bundle', bundleSchema)

