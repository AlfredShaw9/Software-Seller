// & Imports
// * Functions
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button as ChakraButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { activeUser } from '../utils/helpers/common'

// * Images
import star from '../assets/xp_assets/1366.ico'
import folder from '../assets/xp_assets/folder8.png'

// * Toolbar images
import softSellImg from '../assets/software-seller-icon.png'
import back from '../assets/xp_assets/back-button.png'
import next from '../assets/xp_assets/next-button.png'
import search from '../assets/xp_assets/search-icon.png'
import file from '../assets/xp_assets/file.png'
import fileView from '../assets/xp_assets/file-view-options.png'
import fileBack from '../assets/xp_assets/file-back.png'

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
      <div className='window reviewWindow buyWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Reviews</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className='windowTopBar'>
        <div className='topNavBar'>
          <div className = 'toolBar'>
            <p>File</p>
            <p>Edit</p>
            <p>View</p>
            <p>Favourites</p>
            <p>Tools</p>
            <p>Help</p>
          </div>
          <div className='topNavBarImgPadding'>
            <div className='topNavBarImg' style={ { backgroundImage: `url(${softSellImg})` } }></div>
          </div>
        </div>
        <div className='bottomNavBar'>
          <div>
            <img className='nav' src={back}/>
            <p>Back</p>
          </div>
          <div>
            <img className='nav' src={next}/>
          </div>
          <div>
            <img src={fileBack}/>
          </div>
          <section className='separator'></section>
          <div>
            <img src={search}/>
            <p>Search</p>
          </div>
          <div>
            <img src={file}/>
            <p>Folders</p>
          </div>
          <section className='separator'></section>
          <div>
            <img src={fileView}/>
          </div>
        </div>
      </div>
        <div className='reviews-header'>
          {activeUser() && <ChakraButton as={ReactRouterLink} to={`/reviews/yourOpinion`} colorScheme='blue' className='actionLink'>
            <button type='button'>Write a review</button>
          </ ChakraButton>}
          <div className='filters'>
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
        <div className='displayCont'>
          { filteredReviews.length > 0 && filteredReviews.map(review => {
            const { _id, rating, description } = review
            return (
              <div key = {_id}>
                  <div className='indivBundleCont indivReviewCont' style={{backgroundImage: `url(${folder})` }}>
                    <p className='reviewTxt'>{description}</p>
                    {/* <p><b>Rating: {rating}/5 </b></p> */}
                    <div className='visual-rating'>
                      {rating > 0 && <img className='rating-star' src={star} alt='star'/>}
                      {rating > 1 && <img className='rating-star' src={star} alt='star'/>}
                      {rating > 2 && <img className='rating-star' src={star} alt='star'/>}
                      {rating > 3 && <img className='rating-star' src={star} alt='star'/>}
                      {rating > 4 && <img className='rating-star' src={star} alt='star'/>}
                    </div>
                  </div>
                </div>
            )
          }) }
        </div>
      </div>
    </>
  )
}