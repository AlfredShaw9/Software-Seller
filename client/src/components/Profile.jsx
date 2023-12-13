// & Imports
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { activeUser } from '../utils/helpers/common'
import { useEffect } from 'react'
import 'xp.css/dist/XP.css'

// * Images
import fileImg from '../assets/xp_assets/file.png'
import hardDrive from '../assets/xp_assets/hard-drive-icon-large.png'
import diskDrive from '../assets/xp_assets/disk-drive-icon-large.png'

export default function Profile(){

  const navigate = useNavigate()

  // & Effects
  useEffect(() => {
    if (!activeUser()) navigate('/login')
  }, [])

  // * JSX
  return(
    <>
      <div className='window buyWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Buy</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className='computerContainer'>
          <div className='computerRow bidsRow'>
            <div className='rowHeader'>
              <h5>Files Stored on This Computer</h5>
            </div>
            <div className='rowMain'>
              <div className='bidsContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/bids'}>
                  <img src={fileImg}/>
                  <p>My Bids</p>
                </ChakraLink>
              </div>
            </div>
          </div>
          <div className='computerRow boughtRow'>
            <div className='rowHeader'>
              <h5>Hard Disk Drives</h5>
            </div>
            <div className='rowMain'>
              <div className='boughtContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/bought'}>
                  <img src={hardDrive}/>
                  <p>Purchases</p>
                </ChakraLink>
              </div>
            </div>
          </div>
          <div className='computerRow soldRow'>
            <div className='rowHeader'>
              <h5>Devices with Removable Storage</h5>
            </div>
            <div className='rowMain'>
              <div className='soldContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/sold'}>
                  <img src={diskDrive}/>
                  <p>Sales</p>
                </ChakraLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}