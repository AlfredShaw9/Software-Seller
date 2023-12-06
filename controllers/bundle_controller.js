import Bundle from '../models/bundle_model.js'

// ! Index
// Method: GET
//  Path: /bundles

export const getAllBundles = async (req, res) => {
  const bundles = await Bundle.find()
  return res.json(bundles)
}

// ! Create
// Method: POST
//  Path: /bundles

export const createBundles = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const bundleToCreate = await Bundle.create(req.body)
    return res.status(201).json(bundleToCreate)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// ! Show
// Method: GET
// Path: /bundles/:bundleId

export const getSingleBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findById(bundleId).populate('owner')
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

// ! Update
// Method: PUT
// Path: /bundles/: bundleId

export const updateBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findById(bundleId)
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found ' })
    }
    // * Check to see that the user making the request (req.currentUser) matches the user referenced on the bundle owner field
    console.log(req.currentUser._id) // User making request 
    console.log(bundle.owner) // User that owns the bundle
    console.log(bundle.owner.equals(req.currentUser._id)) // Does user match owner
    // * If the user does not match throw an error
    if (!bundle.owner.equals(req.currentUser._id)){
      return res.status(401).json({ message: 'Unauthorized' })
    }
    // * If the user matches, update and save
    Object.assign(bundle, req.body)
    await bundle.save()
    return res.json(bundle) 
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// * Delete
// Method: DELETE
//  Path: /bundles/: bundleId

export const deleteBundle = async (req, res) => {
  try {
    const { bundleId } = req.params
    const bundle = await Bundle.findOneAndDelete({ _id: bundleId, owner: req.currentUser._id })
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found : unauthorized' })
    }
    return res.sendStaus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
