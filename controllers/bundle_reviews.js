import Bundle from '../models/bundle_model.js'

// ! Review Controllers

// * Index
// Method: GET
// Path: /reviews

export const getAllReviews = async (req, res) => {
  const reviews = await Bundle.find()
  return res.json(reviews)
}

// * Create
// Method: POST
// Path: /reviews 

export const createReview = async (req, res) => {
  try {
    const createReview = await Bundle.create(req.body)
    return res.status(201).json(createReview)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
