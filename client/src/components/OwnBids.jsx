// Group by software; only display top 5
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import "xp.css/dist/XP.css"

export default function OwnBids() {

  const bidsOwn = useLoaderData()
  const sortedBundles = bidsOwn
  const sort = []
  const sortedBundle = []

  bidsOwn.map(bid => {
    sort.push([bid.bundle.software, bid.value])
    return
  })

  // console.log(sort)
  // ! FIX THIS THING or not idk
  sort.map(bundle => {
    const bundleSoftware = bundle[0]
    const bundleBid = bundle[1]
    if (sortedBundle.includes(bundleSoftware)) {
      sortedBundle[sortedBundle.findIndex(bundleSoftware)].push(bundleBid)
    } else if (!sortedBundle.includes(bundleSoftware)) {
      sortedBundle.push(bundleSoftware)
      sortedBundle[sortedBundle.findIndex(bundleSoftware)].push(bundleBid)
    }
  })

  console.log(sortedBundle)

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
          const { _id, software } = bundle
          return (
            <div key = {_id} className='outerBorder'>
              <div className='indivBundleCont'>
                <p>{software}</p>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          )
        }) }
      </section>
    </div>
  )
}