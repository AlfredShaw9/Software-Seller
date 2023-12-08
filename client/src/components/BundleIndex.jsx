
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


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
    <>
      <div id="filters">
        <select name="OS" value={filters.region} onChange={handleChange}>
          <option value="All">All</option>
          <option value="Windows">Windows</option>
          <option value="macOS">MacOS</option>
          <option value="Other">Other</option>
        </select>
        <input name="search" placeholder='Search...' value={filters.search} onChange={handleChange} />
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
              <div className='indivBundleCont'>
                <div className='bundleImg' style={ { backgroundImage: `url(${image})` } }>
                  {operatingSystem}
                </div>
                <p>{software}, {version}</p>
                <p>Current Bid: £{maxBid} </p>
              </div>
            </ChakraLink>
          )
        }) }
      </section>
    </>
  )
}