import Bid from '../models/bid_model.js'

// & Index
// ? GET
// * /bids

export const getAllBids = async (req, res) => {
  const bids = await Bid.find()
  return res.json(bids)
}

// & Index (owner specific)
// ? GET
// * /bids

export const getOwnBids = async (req, res) => {
  const bids = await Bid.find( { owner: req.currentUser._id  } )
    .populate({path: 'bundle', populate: 'winDetails', select: 'winDetails software' })
  return res.json(bids)
}

// & Create
// ? POST
// * /bids

export const createBid = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    req.body.bundle = Object.values(req.params)[0]
    const bidToCreate = await Bid.create(req.body)
    return res.status(201).json(bidToCreate)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Get One
// ? GET
// * /bids/:bidId

export const getSingleBid = async (req, res) => {
  try {
    const { bidId } = req.params
    const bid = await Bid.findById(bidId).populate('owner')
    if (!bid){
      return res.status(404).json({ message: 'Bid not found' })
    }
    // ? If the bid exists
    return res.json(bid)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Update
// ? PUT
// * /bids/:bidId

export const updateBid = async (req, res) => {
  try {
    const { bidId } = req.params
    const bid = await Bid.findById(bidId)
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found ' })
    }
    console.log('User making request: ', req.currentUser._id)
    console.log('User that owns bid: ', bid.owner)
    console.log('Does user match owner: ', bid.owner.equals(req.currentUser._id))
    if (!bid.owner.equals(req.currentUser._id)){
      return res.status(401).json({ message: 'Unauthorized' })
    }
    Object.assign(bid, req.body)
    await bid.save()
    return res.json(bid) 
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Delete
// ? DELETE
// * /bids/:bidId

export const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params
    const bid = await Bid.findOneAndDelete({ _id: bidId, owner: req.currentUser._id })
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found : unauthorized' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
