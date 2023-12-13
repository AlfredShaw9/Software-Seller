import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import "xp.css/dist/XP.css"

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
      console.log('Bundle: ', bundle)
      console.log('Bundle winDetails: ', bundle.winDetails)
      return bundle.winDetails !== undefined
      })
    setValidBundles(sold)
  }, [soldAll])

  console.log(validBundles)

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