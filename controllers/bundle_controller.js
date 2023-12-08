import Bundle from '../models/bundle_model.js'

// & Index
// ? GET
// * /bundles

export const getAllBundles = async (req, res) => {
  const bundles = await Bundle.find()
  return res.json(bundles)
}

// & Create
// ? POST
// * /bundles

export const createBundle = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const bundleToCreate = await Bundle.create(req.body)
    return res.status(201).json(bundleToCreate)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Get One
// ? GET
// * /bundles/:bundleId

export const getSingleBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findById(bundleId).populate('owner').populate('maxBid').populate('bids')
    if (!bundle){
      return res.status(404).json({ message: 'Bundle not found' })
    }
    // ? If the bundle exists
    return res.json(bundle)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Update
// ? PUT
// * /bundles/:bundleId

export const updateBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findById(bundleId)
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found ' })
    }
    // console.log('User making request: ', req.currentUser._id)
    // console.log('User that owns bundle: ', bundle.owner)
    // console.log('Does user match owner: ', bundle.owner.equals(req.currentUser._id))
    if (!bundle.owner.equals(req.currentUser._id)){
      return res.status(401).json({ message: 'Unauthorized' })
    }
    Object.assign(bundle, req.body)
    await bundle.save()
    return res.json(bundle) 
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Delete
// ? DELETE
// * /bundles/:bundleId

export const deleteBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findOneAndDelete({ _id: bundleId, owner: req.currentUser._id })
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found : unauthorized' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
