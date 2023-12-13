
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { activeUser } from '../utils/helpers/common'
import "xp.css/dist/XP.css"


export default function AllBought() {

  const all = useLoaderData()


  // & State
  const [ filters, setFilters ] = useState({
    status: 'Won',
    search: ''
  })
  const [ filteredBundles, setFilteredBundles ] = useState('')
  const [ boughtBundles, setBoughtBundles ] = useState([])


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
    const bought = all.filter(bundle => {
      if (bundle.winDetails !== undefined) {
        return (bundle.winDetails.winner === activeUser())
      } else return
    })
    setBoughtBundles(bought)
  }, [all])

  useEffect(() => {
    const pattern = new RegExp(filters.search, 'i')
    const filteredArr = boughtBundles.filter(bundle => {
      if (filters.status === 'Winning') {
        return pattern.test(bundle.software) && (new Date(bundle.auctionEnd)>new Date())
      } else if (filters.status === 'Won') {
        return pattern.test(bundle.software) && (new Date(bundle.auctionEnd)<new Date())
      }
    })
    setFilteredBundles(filteredArr)
  }, [boughtBundles, filters.search, filters.status])


  return (
    <div className='window buyWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Bought items</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div id='filters'>
        <select name='status' value={filters.status} onChange={handleChange}>
          <option value='Won'>Won</option>
          <option value='Winning'>Winning</option>
        </select>
        <input name='search' placeholder='Search...' value={filters.search} onChange={handleChange} />
      </div>
      <section className='bundleDisplayCont'>
        { filteredBundles.length > 0 && filteredBundles.map(bundle => {
          const { _id, software, version, operatingSystem, image, auctionEnd, winDetails, startPrice } = bundle
          const { maxBid } = winDetails
          return (
            <ChakraLink
            key = {_id}
            as = {ReactRouterLink}
            to = {`/buy/${_id}`}
            >
              <div className='outerBorder'>
                <div className='indivBundleCont'>
                  <div className='bundleImg' style={ { backgroundImage: `url(${image})` } }>
                    {operatingSystem}
                  </div>
                  {software}, {version}
                  <button>Current Bid: £{!maxBid ? startPrice : maxBid}  </button>
                </div>
              </div>
            </ChakraLink>
          )
        }) }
      </section>
    </div>
  )
}