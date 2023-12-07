// & Imports
// * Packages
import { Link, Form, useLoaderData } from 'react-router-dom'
import React from 'react'

// * Styling
import { Button, ButtonGroup } from '@chakra-ui/react'

// * Images
import windows2000 from '../assets/windows2000.png'

// & Default function
export default function Home(){

// Retrieve bundle data and save to const
const bundle = useLoaderData()

  // * JSX
  return(
    <>
      <div className='container'>
        <div className='lhs'>
          {/* <img className='bundle-pic' src={ windows2000 } alt='live reaction'/> */}
          <div className='buttons'> 
            <Button>Back</Button>
            <Button>Save</Button>
          </div>
        </div>
        <div className='description'>
          {/* <h2 className='title'>${bundle.software}</h2> */}
          <section className='details'>
          Version: software version
          Operating System: software OS
          Release Year: 10BC
          Description: Something something something why are you reading this, maybe you should go outside, or read a book, or watch a movie. I like movies, they are neat. Whats your favourite movie? Actually dont answer that. I wonder whats for dinner.
          </section>
          <div className='bid-section'>
            <p className='timer'>Time Remaining: 20 hours</p>
            <div>
            <Button className='bid'>Place Bid</Button>
            <p>Current Bid: <span>£0.10</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}