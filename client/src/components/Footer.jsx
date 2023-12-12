// & Import
// * Packages
import { useEffect, useState } from 'react'
import React from 'react'

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

  //  * JSX
  return(
    <>
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
                  Start Menu
                  </DrawerHeader>
                <DrawerBody className="startBody">
                  <h1>Hello world</h1>
                </DrawerBody>
                <DrawerFooter className='startFooter'>
                  <Button className ='iconButton' variant='outline' mr={6} onClick={onClose}>
                    <img className='iconImage' src={sdIcon} />
                  </Button>
                  <Button colorScheme='blue'>
                  <img className='iconImage' src={loIcon} />
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          <div className="citationsGroup">
            <a target='_blank' rel='noreferrer' href="https://www.apple.com/mac/" className='citationsWindow display-6'>A</a>
            <a target='_blank' rel='noreferrer' href="https://github.com/philiphart1006" className='citationsWindow display-6'>Code with Hart</a>
            <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9" className='citationsWindow display-6'>Shaw-fire Coding</a>
            <a target='_blank' rel='noreferrer' href="https://github.com/AlfredShaw9/Software-Seller" className='citationsWindow display-6'>Collaboration</a>
          </div>
        </div>
        <div className="clockGroup">
          <p className='citations display-6'><a target='_blank' href="https://forms.gle/Mt7EpfroDbSBCBxw8">🐛</a></p>
          <p>{time}</p>
        </div>
      </footer>
    </>
  )
}