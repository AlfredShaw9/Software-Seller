// Group by software; only display top 5
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import "xp.css/dist/XP.css"

export default function OwnBids() {

  const bidsOwn = useLoaderData()
  // const sortedBundles = bidsOwn
  const sort = []
  const sortedBundles = []

  bidsOwn.map(bid => {
    sort.push([bid.bundle.software, bid.value, bid.bundle.winDetails.maxbid])
    return
  })

  console.log('Sort array: ',sort)
  // ! FIX THIS THING or not idk
  // & i fixed it
  sort.map(bundle => {
    // console.log(bundle)
    const bundleSoftware = bundle[0]
    const bundleBid = bundle[1]
    const bundleMaxBid = bundle[2]
    let existingIndex = -1
    // console.log('sbl ',sortedBundle.length)
    for (let i = 0; i < sortedBundles.length; i++) {
      if (sortedBundles[i]['software'] === bundleSoftware) {
        existingIndex = i
      }
    }
    // console.log('ei ',existingIndex)
    if (existingIndex === -1) {
      // console.log('bundle does not exist')
      const newObj = { 
        software: bundleSoftware,
        maxBid: bundleMaxBid,
        bids: [bundleBid]
      } 
      sortedBundles.push(newObj)
    } else {
      // console.log('bundle exists')
      sortedBundles[existingIndex]['bids'].push(bundleBid)
    }
    // console.log('-----------------')
    
    // if (sortedBundle.includes(bundleSoftware)) {
    //   sortedBundle[sortedBundle.findIndex(bundleSoftware)].push(bundleBid)
    // } else if (!sortedBundle.includes(bundleSoftware)) {
    //   sortedBundle.push(bundleSoftware)
    //   sortedBundle[sortedBundle.findIndex(bundleSoftware)].push(bundleBid)
    // }
  })

  for (let i = 0; i < sortedBundles.length; i++) {
    sortedBundles[i]['bids'].sort().reverse()
  }
  

  console.log(sortedBundles)

  return (
    <div className='window buyWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Your bids</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <section className='bundleDisplayCont'>
        { sortedBundles.length > 0 && sortedBundles.map(bundle => {
          const { _id, software, bids, maxBid } = bundle

          return (
            <div key = {_id} className='outerBorder'>
              <div className='indivBundleCont'>
                <p>{software}</p>
                <p>{maxBid}</p>
                <ul>
                  <li key = {_id}>£{bids[0]}</li>
                  <li key = {_id}>£{bids[1]}</li>
                  <li key = {_id}>£{bids[2]}</li>
                  <li key = {_id}>£{bids[3]}</li>
                  <li key = {_id}>£{bids[4]}</li>
                </ul>
                {/* going insane, but it works, wooooo */}
              </div>
            </div>
          )
        }) }
      </section>
    </div>
  )
}