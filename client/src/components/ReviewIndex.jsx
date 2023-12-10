
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


export default function AllReviews() {

  const reviewsAll = useLoaderData()


  // & State
  const [ rating, setRating ] = useState('All')
  const [ filteredReviews, setFilteredReviews ] = useState('')


  // & Functions
  function handleChange(e){ 
    setRating(e.target.value)
  }


  // & Effects
  useEffect(() => {
    const filteredArr = reviewsAll.filter(review => {
      return (review.rating.toString() === rating || rating === 'All')
    })
    setFilteredReviews(filteredArr)
  }, [rating, reviewsAll])

  return (
    <>
      <ChakraLink as={ReactRouterLink} to={`/reviews/yourOpinion`}>
        Write a review
      </ ChakraLink>
      <div id='filters'>
        <select name='rating' value={rating} onChange={handleChange}>
          <option value='All'>All</option>
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>
      <section className='reviewDisplayCont'>
        { filteredReviews.length > 0 && filteredReviews.map(review => {
          const { _id, rating, description } = review
          return (
            <ChakraLink
            key = {_id}
            as = {ReactRouterLink}
            to = {`/reviews/${_id}`}
            >
              <div className='indivReviewCont'>
                <p>{description}</p>
                <p>Rating: {rating}/5 </p>
              </div>
            </ChakraLink>
          )
        }) }
      </section>
    </>
  )
}