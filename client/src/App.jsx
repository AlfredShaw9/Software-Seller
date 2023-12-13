// * Packages
import { Outlet, useNavigation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// * Components
import Header from './components/Header'
import Footer from './components/Footer'

// * Styling
import { Spinner } from '@chakra-ui/react'

function App() {

  const navigation = useNavigation()

  return (
    <>
      <Header />
      <main>
        {
          navigation.state === 'idle'
          ?
          <Outlet />
          :
          <div>
            <div className='window'>
              <div className="title-bar">
                <div className="title-bar-text">Loading</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize" />
                  <button aria-label="Maximize" />
                  <button aria-label="Close" />
                </div>
              </div>
              <div style={{padding: '10px'}}>
                <progress></progress>
              </div>
            </div>
          </div>
          // <Spinner
          //   thickness='4px'
          //   speed='0.65s'
          //   emptyColor='gray.200'
          //   color='blue.500'
          //   size='xs'
          // />
        }
        {/* <Outlet /> */}
      </main>
      <Footer />
    </>
  )
}

export default App
