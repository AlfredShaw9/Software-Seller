import Review from '../models/review_model.js'

// ! Review Controllers

// & Index
// ? GET
// * /reviews

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find()
  return res.json(reviews)
}

// & Get One
// ? GET
// * /reviews/:reviewId

export const getSingleReview = async (req, res) => {
  try {
    const { reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review){
      return res.status(404).json({ message: 'Review not found' })
    }
    // ? If the review exists
    return res.json(review)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Create
// ? Method: POST
// * /reviews 

export const createReview = async (req, res) => {
  try {
    req.body.author = req.currentUser._id
    const createReview = (await Review.create(req.body)).populate('author')
    return res.status(201).json(createReview)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// & Delete
// ? DELETE
// * /reviews/:reviewId

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params
    const review = await Review.findOneAndDelete({ _id: reviewId, author: req.currentUser._id })
    if (!review) {
      return res.status(404).json({ message: 'review not found : unauthorized' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
