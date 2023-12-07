
import { useLoaderData, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
// import { useEffect, useState } from 'react'
// import { Container } from '@chakra-ui/react'




export default function AllBundles() {

  const bundlesAll = useLoaderData()

  return (
    <>
      <section className='bundleDisplayCont'>
        { bundlesAll.map(bundle => {
          const { _id, software, version, operatingSystem, image, auctionEnd, startPrice } = bundle
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
                <p>{auctionEnd}, £{startPrice} </p>
              </div>
            </ChakraLink>
          )
        }) }
      </section>
    </>
  )
}