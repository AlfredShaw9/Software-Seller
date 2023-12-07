// & Imports
// * Packages
import { Link, Form, useLoaderData, useActionData, useNavigate } from 'react-router-dom'
import React from 'react'
import { useEffect } from 'react'

// * Styling
import { Button, ButtonGroup } from '@chakra-ui/react'

// * Images
import windows2000 from '../assets/windows2000.png'

// & Default function
export default function BundleSingle(){
  const res = useActionData()
  const navigate = useNavigate()

  // ! Unsure about this - how can we prevent the submit button's default?
  useEffect(() => {
    if (res?.status === 201) {
      // navigate(`/bundles/${req.params}`)
      navigate(`/`)
    }
  }, [res, navigate])

  // Retrieve bundle data and save to const
  const bundle = useLoaderData()
  
  // Destructure
  const { software, version, operatingSystem, releaseYear, description, image, startPrice, auctionEnd, owner } = bundle

  // Time remaining
  const dateTimeNow = parseInt((new Date().getTime() / (1000)))
  const auctionEndDT = parseInt((new Date(auctionEnd).getTime() / (1000)))
  const auctionEndDate = new Date(auctionEnd).toDateString()
  const auctionEndHour = new Date(auctionEnd).getHours()
  const auctionEndMinute = new Date(auctionEnd).getMinutes()
  const timeRemaining = parseInt(auctionEndDT) - parseInt(dateTimeNow)

  // * React timer
  // Credit: https://codepen.io/saas/pen/RwWNEGJ
  
  const [remaining, setRemaining] = React.useState(timeRemaining);

  React.useEffect(() => {
    const timerId = setInterval( () => tock(), 1000);
    return function cleanup(){
      clearInterval(timerId)
    }
  })

  function tock() {
    setRemaining(parseInt(auctionEndDT) - parseInt(parseInt((new Date().getTime() / (1000)))))
  }


  // * JSX
  return(
    <>
      <div className='bundle-container'>
        <div className='lhs'>
          <img className='bundle-pic' src={ windows2000 } alt='live reaction'/>
          <div className='buttons'> 
            <Button>Back</Button>
            <Button>Save</Button>
          </div>
        </div>
        <div className='rhs'>
          <h2 className='title'>{ software }</h2>
          <section className='details'>
            <p>Version: {version}</p>
            <p>Release Year: {releaseYear}</p>
            <p>Operating System: {operatingSystem}</p>
            <p>Description: {description}</p>
          </section>
          <div className='bid-section'>
            <p className='auction-end'>Auction ends: {auctionEndHour}:{auctionEndMinute} on {auctionEndDate}</p>
            <p className='timer'>Time Remaining: {timeRemaining} seconds</p>
            <p className='timer'>Time Remaining: {remaining} seconds</p>
            <div>
              <Button className='bid'>Place Bid</Button>
              <p>Current Bid: <span>£0.10</span></p>
            </div>
          </div>
        </div>
        <div>
          <Form method="POST">
            <label hidden htmlFor='value'>Value (£)</label>
            <input type='number' name='value' placeholder={software} />
            <button className='btn' type='submit'>Submit bid</button>
            {res && <p>{res.data.message}</p>}
          </Form>
        </div>
      </div>
    </>
  )
}