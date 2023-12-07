// * Packages
import { Outlet, useNavigation } from 'react-router-dom'

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
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        }
        {/* <Outlet /> */}
      </main>
      <Footer />
    </>
  )
}

export default App
