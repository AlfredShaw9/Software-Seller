// & Imports
// * Packages
import { Link, Form, useLoaderData, useActionData, useNavigate,  } from 'react-router-dom'
import React from 'react'
import { useEffect } from 'react'
import { activeUser } from '../utils/helpers/common'
import { useFetcher } from 'react-router-dom'

// * Styling
import { Button, ButtonGroup, Link as ChakraLink } from '@chakra-ui/react'

// * Images
import windows2000 from '../assets/windows2000.png'

// & Default function
export default function BundleSingle(){
  
  // * Constants
  const res = useActionData()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  // Retrieve bundle data and save to const
  const bundle = useLoaderData()
  
  // Destructure
  const { _id, software, version, operatingSystem, releaseYear, description, image, startPrice, auctionEnd, owner, winDetails } = bundle
  const { maxBid, winner } = winDetails
  // const { email } = winner

  // * Time remaining
  const auctionEndDT = parseInt((new Date(auctionEnd).getTime() / (1000)))
  const auctionEndDate = new Date(auctionEnd).toDateString()
  const auctionEndHour = new Date(auctionEnd).getHours()
  const auctionEndMinute = new Date(auctionEnd).getMinutes()
  // Boolean that changes from true to false when auctionEnd datetime is passed
  const active = parseInt(auctionEndDT) > parseInt(parseInt((new Date().getTime() / (1000))))

  // * React timer
  // Credit: https://codepen.io/saas/pen/RwWNEGJ
  const [remaining, setRemaining] = React.useState(0);

  React.useEffect(() => {
    const timerId = setInterval( () => tock(), 1000);
    return function cleanup(){
      clearInterval(timerId)
    }
  })

  function tock() {
    setRemaining(parseInt(auctionEndDT) - parseInt(parseInt((new Date().getTime() / (1000)))))
  }


  // Convert timer format to HH:MM:SS
  const DaysRemaining = Math.floor(remaining/(3600*24))
  const HoursRemaining = (Math.floor(remaining/3600) % 24)
  const MinutesRemaining = (Math.floor(remaining/60) % 60)
  const SecondsRemaining = remaining % 60

  // * JSX
  return(
    <>
      <div className='bundle-container'>
        <div className='lhs'>
          <img className='bundle-pic' src={ image } alt='live reaction'/>
          <div className='buttons'> 
            <ChakraLink as={Link} to='/buy'>To All Active Auctions</ ChakraLink>
            {activeUser() === owner._id && active &&
              <div>
                <ChakraLink as={Link} to={`/buy/${_id}/edit`}>Edit</ ChakraLink>
                <Form
                  method='post'
                  action='delete'
                  onSubmit={(e) => {
                    if (
                      !confirm(
                        'Are you sure you want to delete this bundle?'
                      )
                    ) {
                      e.preventDefault()
                    }
                  }}
                >
                  <button type='submit'>Delete</button>
                </Form>
              </div>
            }
            {activeUser() === winner && !active &&
              <div>
                <ChakraLink as={Link} to={`/buy/${_id}/pay`}>Pay</ ChakraLink>
              </div>
            }
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
            <p className='timer'>Time Remaining: {remaining} seconds</p>
            <p>Winner: {winner}</p>
            {/* Make it so the owner cant place a bid on their own item possibly? */}
            { active
              ?
              <div>
                <p className='timer'>Time Remaining: {remaining < 0 ? 'Expired' : `${DaysRemaining} days ${HoursRemaining < 10 ? 0 : ''}${HoursRemaining} hours ${MinutesRemaining < 10 ? 0 : ''}${MinutesRemaining} minutes ${SecondsRemaining < 10 ? 0 : ''}${SecondsRemaining} seconds`}</p>
                {activeUser() && <div className='active-actions'>
                  <Button className='bid'>Place Bid</Button>
                  <p>Current Bid: <span>£{!maxBid ? startPrice : maxBid}</span></p>
                  <div>
                    <Form method="post">
                      <label hidden htmlFor='value'>Value (£)</label>
                      <input type='number' name='value' placeholder={maxBid} />
                      <button className='btn' type='submit'>Submit bid</button>
                      {res && <p>{res.data.message}</p>}
                    </Form>
                  </div>
                </div>}
              </div>
              :
              <div className='inactive-actions'>
              <p className='timer'>Auction has ended</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}