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
  status: String,
  owner: { type: mongoose.ObjectId, ref: 'User', required: true }
})

// * Allow virtuals
bundleSchema
  .set('toJSON',{
    virtuals: true,
})

// ! This needs fixing
// * Virtual field for maxBid
bundleSchema
  .virtual('maxBid', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle',
  })
  .get(function(bids){
    // console.log(`Hopefully bids: ${bids}`)
    if (bids == '') {
      return 
    } else {
      return bids?.sort((a, b) => a.value - b.value)[bids.length - 1].value
    }
    // return (Math.max(bids.value))
  })


// * Virtual field for bids
bundleSchema
  .virtual('bids', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'bundle',
  })

// * Get max bid from bundleSchema's bids array
// There is a function that allows mutation of bids object as it comes in
// bundleSchema
//   .virtual('maxBid')
//   .get('bids', {
//     ref: 'Bid',
//     localField: '_id',
//     foreignField: 'bundle'
//   })
//   .get(function(bids){
//     if(!bids?.length) return 'No bids yet'
//     return (Math.max(bids))
//   })


export default mongoose.model('Bundle', bundleSchema)

