
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import "xp.css/dist/XP.css"
import React from 'react'

import softSellImg from '../assets/software-seller-icon.png'
import back from '../assets/xp_assets/back-button.png'
import next from '../assets/xp_assets/next-button.png'
import search from '../assets/xp_assets/search-icon.png'
import file from '../assets/xp_assets/file.png'
import fileView from '../assets/xp_assets/file-view-options.png'
import fileBack from '../assets/xp_assets/file-back.png'


export default function AllBundles() {

  const bundlesAll = useLoaderData()

  
  // & State
  const [ filters, setFilters ] = useState({
    OS: 'All',
    search: ''
  })
  const [ filteredBundles, setFilteredBundles ] = useState('')


  // & Functions
  function handleChange(e){
    const newObj = { 
      ...filters,
      [e.target.name]: e.target.value
    } 
    setFilters(newObj)
  }


  // & Effects
  useEffect(() => {
    const pattern = new RegExp(filters.search, 'i')
    const pattern2 = new RegExp(filters.OS, 'i')
    const filteredArr = bundlesAll.filter(bundle => {
      return pattern.test(bundle.software) && (pattern2.test(bundle.operatingSystem) || filters.OS === 'All')
    })
    setFilteredBundles(filteredArr)
  }, [bundlesAll, filters.search, filters.OS])

  
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
        <div className="title-bar-text">Buy</div>
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
          <section className='seperator'></section>
          <div>
            <img src={search}/>
            <p>Search</p>
          </div>
          <div>
            <img src={file}/>
            <p>Folders</p>
          </div>
          <section className='seperator'></section>
          <div>
            <img src={fileView}/>
          </div>
        </div>
      </div>
      <div className='filters'>
        <select name='OS' value={filters.OS} onChange={handleChange}>
          <option value='All'>All</option>
          <option value='Windows'>Windows</option>
          <option value='macOS'>MacOS</option>
          <option value='Other'>Other</option>
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
                  <p className="title">{software}, {version}</p>
                  <p className="timer">{timeRemaining < 0 ? 'Expired' : `${DaysRemaining} days ${HoursRemaining < 10 ? 0 : ''}${HoursRemaining} hours ${MinutesRemaining < 10 ? 0 : ''}${MinutesRemaining} minutes ${SecondsRemaining < 10 ? 0 : ''}${SecondsRemaining} seconds`}</p>
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