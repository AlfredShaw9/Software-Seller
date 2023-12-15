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
import compSq from '../assets/xp_assets/123.ico'
import softSellImg from '../assets/software-seller-icon.png'
import back from '../assets/xp_assets/back-button.png'
import next from '../assets/xp_assets/next-button.png'
import search from '../assets/xp_assets/search-icon.png'
import file from '../assets/xp_assets/file.png'
import fileView from '../assets/xp_assets/file-view-options.png'
import fileBack from '../assets/xp_assets/file-back.png'

export default function Profile(){

  const navigate = useNavigate()

  // & Effects
  useEffect(() => {
    if (!activeUser()) navigate('/login')
  }, [])

  // * JSX
  return(
    <>
      <div className='window profileWindow'>
        <div className="title-bar">
          <div className="title-bar-text"><img src={compSq}/> Profile</div>
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
          <section className='separator'></section>
          <div>
            <img src={search}/>
            <p>Search</p>
          </div>
          <div>
            <img src={file}/>
            <p>Folders</p>
          </div>
          <section className='separator'></section>
          <div>
            <img src={fileView}/>
          </div>
        </div>
      </div>
        <div className='computerContainer'>
          <div className='computerRow bidsRow'>
            <div className='rowHeader'>
              <h5>Files Stored on This Computer</h5>
            </div>
            <div className='divider'></div>
            <div className='rowMain'>
              <div className='profileContainer bidsContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/bids'} className='profileLink'>
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
            <div className='divider'></div>
            <div className='rowMain'>
              <div className='profileContainer boughtContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/bought'} className='profileLink'>
                  <img src={hardDrive}/>
                  <p>Purchases (C:)</p>
                </ChakraLink>
              </div>
            </div>
          </div>
          <div className='computerRow soldRow'>
            <div className='rowHeader'>
              <h5>Devices with Removable Storage</h5>
            </div>
            <div className='divider'></div>
            <div className='rowMain'>
              <div className='profileContainer soldContainer'>
                <ChakraLink as = {ReactRouterLink} to={'/profile/sold'} className='profileLink'>
                  <img src={diskDrive}/>
                  <p>Sales (D:)</p>
                </ChakraLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}