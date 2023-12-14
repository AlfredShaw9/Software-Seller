import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import "xp.css/dist/XP.css"
import React from 'react'

export default function AllSold() {

  const soldAll = useLoaderData()


  // & State
  const [ filters, setFilters ] = useState({
    status: 'Sold',
    search: ''
  })
  const [ filteredBundles, setFilteredBundles ] = useState('')
  const [ validBundles, setValidBundles ] = useState([])


  // & Functions
  function handleChange(e){
    const newObj = { 
      ...filters,
      [e.target.name]: e.target.value
    } 
    setFilters(newObj)
  }

  // & Effects
  // * Error filter
  useEffect(() => {
    const sold = soldAll.filter(bundle => {
      return bundle.winDetails !== undefined
      })
    setValidBundles(sold)
  }, [soldAll])


  useEffect(() => {
    const pattern = new RegExp(filters.search, 'i')
    const filteredArr = validBundles.filter(bundle => {
      if (filters.status === 'Selling') {
        return pattern.test(bundle.software) && (new Date(bundle.auctionEnd)>new Date())
      } else if (filters.status === 'Sold') {
        return pattern.test(bundle.software) && (new Date(bundle.auctionEnd)<new Date())
      }
    })
    setFilteredBundles(filteredArr)
  }, [validBundles, filters.search, filters.status])


  // & Timer
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
    filteredBundles[0] !== undefined
    ?
    setRemaining(parseInt(filteredBundles[0].auctionEnd) - parseInt(parseInt((new Date().getTime() / (1000)))))
    :
    0
  }


  return (
    <div className='window buyWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Sold items</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div id='filters'>
        <select name='status' value={filters.status} onChange={handleChange}>
          <option value='Sold'>Sold</option>
          <option value='Selling'>Selling</option>
        </select>
        <input name='search' placeholder='Search...' value={filters.search} onChange={handleChange} />
      </div>
      <p hidden={true}>{remaining}</p>
      <section className='displayCont'>
        { filteredBundles?.length > 0
        ?
        filteredBundles.map(bundle => {
          const { _id, software, version, operatingSystem, image, auctionEnd, winDetails, startPrice } = bundle
          const { maxBid } = winDetails
          // * Time remaining
          const auctionEndDT = parseInt((new Date(auctionEnd).getTime() / (1000)))
          const timeRemaining = (parseInt(auctionEndDT) - parseInt(parseInt((new Date().getTime() / (1000)))))
          const DaysRemaining = Math.floor(timeRemaining/(3600*24))
          const HoursRemaining = (Math.floor(timeRemaining/3600) % 24)
          const MinutesRemaining = (Math.floor(timeRemaining/60) % 60)
          const SecondsRemaining = timeRemaining % 60
          return (
            <ChakraLink
            key = {_id}
            as = {ReactRouterLink}
            to = {`/buy/${_id}`}
            >
              <div className='outerBorder'>
                <div className='indivBundleCont'>
                  <div className='bundleImg' style={ { backgroundImage: `url(${image})` } }>
                  <div className={operatingSystem.toLowerCase().replaceAll(' ', '').replaceAll(/[^\w\s']|_/g, "")}>
                      {operatingSystem}
                    </div>
                  </div>
                  <p>{software}, {version}</p>
                  <p>{timeRemaining < 0 ? 'Expired' : `${DaysRemaining} days ${HoursRemaining < 10 ? 0 : ''}${HoursRemaining} hours ${MinutesRemaining < 10 ? 0 : ''}${MinutesRemaining} minutes ${SecondsRemaining < 10 ? 0 : ''}${SecondsRemaining} seconds`}</p>
                  { !maxBid
                  ?
                  <button>Starting Bid: £{startPrice}</button>
                  :
                  <button>Current Bid: £{maxBid}</button>
                  }
                </div>
              </div>
            </ChakraLink>
          )}
        )
        :
        <p>No auctions to display</p>
        }
      </section>
    </div>
  )
}