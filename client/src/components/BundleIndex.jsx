
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import "xp.css/dist/XP.css"


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
    const filteredArr = bundlesAll.filter(bundle => {
      return pattern.test(bundle.software) && (bundle.operatingSystem === filters.OS || filters.OS === 'All')
    })
    setFilteredBundles(filteredArr)
  }, [bundlesAll, filters.search, filters.OS])


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
      <div id='filters'>
        <select name='OS' value={filters.OS} onChange={handleChange}>
          <option value='All'>All</option>
          <option value='Windows'>Windows</option>
          <option value='macOS'>MacOS</option>
          <option value='Other'>Other</option>
        </select>
        <input name='search' placeholder='Search...' value={filters.search} onChange={handleChange} />
      </div>
      <section className='bundleDisplayCont'>
        { filteredBundles.length > 0 && filteredBundles.map(bundle => {
          const { _id, software, version, operatingSystem, image, auctionEnd, maxBid, startPrice } = bundle
          return (
            <ChakraLink
            key = {_id}
            as = {ReactRouterLink}
            to = {`/bundles/${_id}`}
            >
              <div className='outerBorder'>
                <div className='indivBundleCont'>
                  <div className='bundleImg' style={ { backgroundImage: `url(${image})` } }>
                    {operatingSystem}
                  </div>
                  {software}, {version}
                  <button>Current Bid: £{maxBid} </button>
                </div>
              </div>
            </ChakraLink>
          )
        }) }
      </section>
    </div>
  )
}