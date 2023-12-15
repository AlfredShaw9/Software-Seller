// & Imports
// * Packages
import { Link, Form, useLoaderData, useActionData, useNavigate,  } from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from 'react'
import { activeUser } from '../utils/helpers/common'
// import { useFetcher } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'

// * Styling
import { Button, ButtonGroup, Link as ChakraLink } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

// * Images
import windows2000 from '../assets/windows2000.png'
import compSq from '../assets/xp_assets/123.ico'
import sideMenu from '../assets/xp_assets/Side-menu.png'
import laughingRich from '../assets/xp_assets/laughingRich.avif'

// & Default function
export default function BundleSingle(){
  
  // * Constants
  const res = useActionData()
  // const navigate = useNavigate()
  // const fetcher = useFetcher()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Retrieve bundle data and save to const
  const bundle = useLoaderData()
  
  // Destructure
  const { _id, software, version, operatingSystem, releaseYear, description, image, startPrice, auctionEnd, owner, winDetails } = bundle
  const { maxBid, winner } = winDetails
  const newBid = (maxBid + 1).toFixed(2)
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

  // ! WIP
  // * Current user
  const [ user, setUser ] = useState('')

  // Put within a useEffect with currentUser as the condition to re-render
  useEffect(() => {
    const username = localStorage.getItem('ss-username')
    setUser(username)
} , [localStorage.getItem('ss-username')])
// ! Down to here

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
      <div className='window bundleWindow'>
        <div className="title-bar">
          <div className="title-bar-text">{software}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className='bundle-container'>
          <div className='bundle-main'>
            <div className='lhs' style={ { backgroundImage: `url(${sideMenu})`}}>
            </div>
          </div>
          <div className='rhs'>
            <h3 className='title font'>Welcome to the Auction Wizard for { software }</h3>
            <section className='details'>
              <div className='details-lhs'>
                <h4>
                  Bundle details
                </h4>
                <div className='set-details font'>
                  <p className='font'>Version: {version} || Release Year: {releaseYear} || Operating System: {operatingSystem}</p>
                </div>
                <p><b>Description:</b> {description}</p>
              </div>
              <img className='bundle-pic' src={ image } alt='bundle photo'/>
            </section>
            <div className='bid-section'>
              <h4> Auction details</h4>
              <p className='auction-end'><b>Auction end:</b> {auctionEndHour}:{auctionEndMinute < 10 && 0}{auctionEndMinute} on {auctionEndDate}</p>
              {/* <p className='timer'>Time Remaining: {remaining} seconds</p> */}
              {/* <p>Winner: {winner}</p> */}
              {/* Make it so the owner cant place a bid on their own item possibly? */}
              <p><b>Current Bid:</b> <span>£{!maxBid ? startPrice : maxBid}</span></p>
              { active
                ?
                <div>
                  <p className='timer'><b>Time Remaining: </b>{remaining < 0 ? 'Expired' : `${DaysRemaining} days ${HoursRemaining < 10 ? 0 : ''}${HoursRemaining} hours ${MinutesRemaining < 10 ? 0 : ''}${MinutesRemaining} minutes ${SecondsRemaining < 10 ? 0 : ''}${SecondsRemaining} seconds`}</p>
                  <div className='active-actions'>
                    {/* <Button className='bid'>Place Bid</Button> */}
                    {activeUser() && activeUser() !== owner._id &&
                    <div className='bid-form font'>
                      <Form method="post">
                        <label hidden htmlFor='value'>Place a bid: £</label>
                        <input type='number' name='value'  step=".01" defaultValue={!maxBid ? startPrice : newBid} placeholder={!maxBid ? startPrice : newBid} />
                        <button className='btn' type='submit'>Submit bid</button>
                        {res && <p>{res.data.message}</p>}
                      </Form>
                    </div>
                    }
                  </div>
                </div>
                :
                <div className='inactive-actions'>
                <p className='timer font'>Auction has ended</p>
                {activeUser() === winner && !active &&
                <p>Congratulations {user}, you&apos;ve won this bundle! Please pay £{maxBid} via the button ↘️</p>
                }
                {activeUser() === owner._id && !active && maxBid > 0 &&
                <p>This bundle has been won by {user} for £{maxBid}</p>
                }
                {maxBid === 0 && <p>This bundle was not sold</p>}
                </div>
              }
            </div>
          </div>
        </div>
        <div className='buttons font'> 
          <ChakraLink as={Link} to='/buy'><button type='button'>To All Active Auctions</button></ ChakraLink>
          {activeUser() === owner._id && active &&
            <div className='owner-buttons'>
              <ChakraLink as={Link} to={`/buy/${_id}/edit`}><button type='button'>Edit</button></ ChakraLink>
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
              <button onClick={onOpen} type='button'>Pay</button>
            </div>
          }
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='modal-content'>
          <ModalHeader></ModalHeader>
          <ModalBody className='modal-body'>
          <div className='window payWindow'>
            <div className="title-bar">
              <div className="title-bar-text">Pay for {software}</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize" />
                  <button aria-label="Maximize" />
                  <button onClick={onClose} aria-label="Close" />
                </div>
              </div>
              <div className = 'payBody'>
                <h5>Give us all your money</h5>
                <img src={laughingRich} />
              </div>
            </div>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      </div>

      
    </>
  )
}