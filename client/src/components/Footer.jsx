// & Import
// * Packages
import { useEffect, useState } from 'react'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { removeToken } from '../utils/helpers/common'
import { useNavigate } from "react-router-dom"


// * Images
import startButton from '../assets/xp_assets/start-button.png'
import logoSq from '../assets/software-seller-icon.png'
// import sdIcon from '../assets/xp_assets/shutdown-icon-windows-10-26.jpg'
// import loIcon from '../assets/xp_assets/log-off-icon.jpeg'

// Images
import usersSq from '../assets/xp_assets/1111.ico'
import compSq from '../assets/xp_assets/123.ico'
import buySq from '../assets/xp_assets/160.ico'
import networkSq from '../assets/xp_assets/142.ico'
import sellSq from '../assets/xp_assets/425.ico'
import loIcon from '../assets/xp_assets/1393.ico'
import sdIcon from '../assets/xp_assets/1429.ico'
import msn from '../assets/xp_assets/842.ico'
import star from '../assets/xp_assets/1366.ico'
import palette from '../assets/xp_assets/1018.ico'
import folder from '../assets/xp_assets/994.ico'
import program from '../assets/xp_assets/1027.ico'
import frogUser from '../assets/xp_assets/frog-user.jpeg'
import doge from '../assets/xp_assets/doge.png'

// * Styling
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'



// & Default function
export default function Footer(){

  // * Setup navigate
  const navigate = useNavigate()

  // * Current user
  const [ user, setUser ] = useState('')

  // Put within a useEffect with currentUser as the condition to re-render
  useEffect(() => {
        const username = localStorage.getItem('ss-username')
        setUser(username)
    } , [localStorage.getItem('ss-username')])

  // * Clock
  // Set state
  const [time, setTime] = useState()

  // Update time each second
  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      const hr = date.getHours()
      const min = date.getMinutes()
      const sec = date.getSeconds()
      const time = `${hr < 10 ? 0 : ''}${hr}:${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`

      setTime(time)
    }, 1000)
  }, [])

  // * Start menu draw from Chakra
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  function handleClick() {
    onClose()
    removeToken()
    navigate('/login')
  }

  //  * JSX
  return(
    <>
      {/* {(user !== null) && */}
          <footer>
          <div className ="footerLeft">
            <Button onClick={(!isOpen && user) ? onOpen : onClose} className="startButton"><img src={startButton} /></Button>
  
              {/* Modal */}
              <Drawer
                className='startMenu'
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={"xs"}
                closeonEsc
                isFullWidth={false}
              >
                <DrawerOverlay
                  h='auto'
                  position='absolute'
                  bottom={'40px'}
                  top={'200px'}
                  right={'400px'}
                />
                <DrawerContent
                className='startContent'
                containerProps={{
                  h: 'auto',
                  top: '200px',
                  bottom: '40px',
                  right: '400px'
                }}
                style={{ position: 'absolute' }}
                >
                  {/* <DrawerCloseButton /> */}
                  <DrawerHeader className='startHeader'>
                    <img src={frogUser} />
                    <p>Welcome {user && user}</p>
                  </DrawerHeader>
                  <DrawerBody className="startBody">
                    <nav>
                      <Link textDecoration={'none'} className='nav-link' to ='/' onClick={onClose}><img className='logo-icon' src={logoSq} alt='ss logo' /><p>Home</p></Link>
                      <Link className='nav-link' to ='/buy' onClick={onClose}><img className='logo-icon random-padding' src={buySq} alt='buy logo' /><p>Buy</p></Link>
                      {(user !== null) && <Link className='nav-link' to ='/sell' onClick={onClose}><img className='logo-icon' src={sellSq} alt='buy logo' /><p>Sell</p></Link>}
                      <Link className='nav-link' to ='/reviews' onClick={onClose}><img className='logo-icon random-padding' src={networkSq} alt='comp logo' /><p>Reviews</p></Link>
                      {(user !== null) && <Link className='nav-link' to ='/profile' onClick={onClose}><img className='logo-icon random-padding' src={compSq} alt='comp logo' /><p>Profile</p></Link>}
                      {(user === null) && <Link className='nav-link' to ='/login' onClick={onClose}><img className='logo-icon' src={usersSq} alt='users logo' /><p>Register/Login</p></Link>}
                      <Link className='nav-link' to ='/buy' onClick={onClose}><p></p></Link>
                      <Link className='nav-link' to ='/buy' onClick={onClose}><p></p></Link>
                      <Link className='nav-link' to ='/buy' onClick={onClose}><p></p></Link>
                    </nav>
                    <nav className='rhnav'>
                    <Link textDecoration={'none'} className='nav-link' to ='/' onClick={onClose}><img className='logo-icon' src={star} alt='star' /><p>Styling credits</p></Link>
                      <Link className='nav-link' to ='http://interface.free.fr/Archives/GUI_Xp.pdf' target='_blank' onClick={onClose}><img className='logo-icon random-padding' src={palette} alt='buy logo' /><p>XP visual guidelines</p></Link>
                      <Link className='nav-link' to ='https://www.mediafire.com/file/z32oaww92k8cuuu/ICON.zip/file' target='_blank' onClick={onClose}><img className='logo-icon' src={folder} alt='buy logo' /><p>Icons bundle</p></Link>
                      <Link className='nav-link' to ='https://botoxparty.github.io/XP.css/' target='_blank' onClick={onClose}><img className='logo-icon random-padding' src={program} alt='comp logo' /><p>XP.css</p></Link>
                      <Link className='nav-link' to ='https://winxp.vercel.app/' target='_blank' onClick={onClose}><img className='logo-icon random-padding' src={doge} alt='doge' /><p>Personal site 1</p></Link>
                      <Link className='nav-link' to ='https://pohwp.dev/' target='_blank' onClick={onClose}><img className='logo-icon' src={msn} alt='msn' /><p>Wei Pin's Personal Website</p></Link>
                      <Link className='nav-link' to ='/' onClick={onClose}><p></p></Link>
                      <Link className='nav-link' to ='/' onClick={onClose}><p></p></Link>
                      
                    </nav>
                  </DrawerBody>
                  <DrawerFooter className='startFooter'>
                    <button className ='iconButton' onClick={handleClick}>
                      <img className='iconImage' src={loIcon} />
                      <p>Log Off</p>
                    </button>
                    <button className ='iconButton' onClick={onClose}>
                      <img className='iconImage' src={sdIcon} />
                      <p>Close</p>
                    </button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            <div className="citationsGroup">
              <a target='_blank' rel='noreferrer' href="https://www.apple.com/mac/" className='citationsWindow display-6'>A</a>
              <a target='_blank' rel='noreferrer' href="https://github.com/philiphart1006" className='citationsWindow display-6'><span className='narrow-mode'>Code with&nbsp;</span>Hart</a>
              <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9" className='citationsWindow display-6'>Shaw<span className='narrow-mode'>-fire Coding</span></a>
              <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9/Software-Seller" className='citationsWindow display-6'>Collab<span className='narrow-mode'>oration</span></a>
            </div>
          </div>
          <div className="clockGroup">
            <p className='citations display-6'><a target='_blank' rel='noreferrer' href="https://forms.gle/Mt7EpfroDbSBCBxw8">🐛</a></p>
            {(user === null) && <Link to="/login"><img src={loIcon} className='login-icon'/></Link>}
            <p className='narrow-mode'>{time}</p>
          </div>
        </footer>
      {/* } */}
    </>
  )
}