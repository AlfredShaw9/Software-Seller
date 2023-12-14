
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button as ChakraButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { activeUser } from '../utils/helpers/common'


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
      <div className='window reviewWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Reviews</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className='reviews-header'>
          {activeUser() && <ChakraButton as={ReactRouterLink} to={`/reviews/yourOpinion`} colorScheme='blue' className='actionLink'>
            <button type='button'>Write a review</button>
          </ ChakraButton>}
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
        </div>
        <section className='displayCont'>
          { filteredReviews.length > 0 && filteredReviews.map(review => {
            const { _id, rating, description } = review
            return (
              <div key = {_id}>
                <div className='outerBorder'>
                  <div className='indivBundleCont'>
                    <p className='reviewTxt'>{description}</p>
                    <p><b>Rating: {rating}/5 </b></p>
                  </div>
                </div>
              </div>
            )
          }) }
        </section>
      </div>
    </>
  )
}