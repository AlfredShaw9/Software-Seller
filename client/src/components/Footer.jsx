// & Import
// * Packages
import { useEffect, useState } from 'react'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'

// * Images
import startButton from '../assets/xp_assets/start-button.png'
import logoSq from '../assets/software-seller-icon.png'
import sdIcon from '../assets/xp_assets/shutdown-icon-windows-10-26.jpg'
import loIcon from '../assets/xp_assets/log-off-icon.jpeg'

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
  console.log(user)

  //  * JSX
  return(
    <>
      {(user !== null) &&
          <footer>
          <div className ="footerLeft">
            <Button onClick={!isOpen ? onOpen : onClose} className="startButton"><img src={startButton} /></Button>
  
              {/* Modal */}
              <Drawer
                className='startMenu'
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={"xs"}
                closeOnOverlayClick
                closeonEsc
                isFullWidth={false}
                // motionPreset={'none'}
              >
                <DrawerOverlay
                  h='auto'
                  position='absolute'
                  bottom={'16px'}
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
                  <img src={logoSq} />
                    Welcome
                    </DrawerHeader>
                  <DrawerBody className="startBody">
                    <nav>
                      <Link to ='/buy'>Buy</Link>
                      <Link to ='/sell'>Sell</Link>
                      <Link to ='/reviews'>Reviews</Link>
                      <Link to ='/profile'>Profile</Link>
                      <Link to ='/login' className='loggedOut'>Register/Login</Link>
                    </nav>
                    <nav>
                      <Link to ='/buy'>Buy</Link>
                      <Link to ='/sell'>Sell</Link>
                      <Link to ='/reviews'>Reviews</Link>
                      <Link to ='/profile'>Profile</Link>
                      <Link to ='/login' className='loggedOut'>Register/Login</Link>
                    </nav>
                  </DrawerBody>
                  <DrawerFooter className='startFooter'>
                    <button className ='iconButton' onClick={onClose}>
                      <img className='iconImage' src={sdIcon} />
                    </button>
                    <button className ='iconButton'>
                    <img className='iconImage' src={loIcon} />
                    </button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            <div className="citationsGroup">
              <a target='_blank' rel='noreferrer' href="https://www.apple.com/mac/" className='citationsWindow display-6'>A</a>
              <a target='_blank' rel='noreferrer' href="https://github.com/philiphart1006" className='citationsWindow display-6'><span className='narrow-mode'>Code with </span>Hart</a>
              <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9" className='citationsWindow display-6'>Shaw<span className='narrow-mode'>-fire Coding</span></a>
              <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9/Software-Seller" className='citationsWindow display-6'>Collab<span className='narrow-mode'>oration</span></a>
            </div>
          </div>
          <div className="clockGroup">
            <p className='citations display-6'><a target='_blank' href="https://forms.gle/Mt7EpfroDbSBCBxw8">🐛</a></p>
            <p className='narrow-mode'>{time}</p>
          </div>
        </footer>
      }
    </>
  )
}