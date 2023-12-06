// * Packages
import { Outlet, useNavigation } from 'react-router-dom'

// * Components
import Header from './components/Header'
import Footer from './components/Footer'

// * Styling
import Spinner from 'react-bootstrap/Spinner'

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
          <Spinner animation='border' />
        }
      </main>
      <Footer />
    </>
  )
}

export default App
