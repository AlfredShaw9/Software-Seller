// & Imports
// * Packages
import { Link } from 'react-router-dom'
import React from 'react'

// * Styling
import { Fade, ScaleFade, Slide, SlideFade, Collapse, Button } from '@chakra-ui/react'

// * Images
import logoSq from '../assets/software-seller-icon.png'
import windows2000 from '../assets/windows2000.png'

// & Default function
export default function Home(){
  // Chakra transition variables:
  const [show, setShow] = React.useState(true)
  const handleToggle = () => setShow(!show)
  
  return(
    <>
      <Collapse startingHeight={20} in={show}>
      <section className='mainHero collapsible'>
        <h2>Livin' La Vista Loca</h2>
        <Link to='#'><img src={ logoSq } alt='ss logo' /></Link>
        <h4>Find the (used software) key to your happiness</h4>
      </section>
    
      </Collapse>
      <Button size='sm' onClick={handleToggle} mt='1rem'>
        Show {show ? 'Less' : 'More'}
      </Button>
      <section className='previewIndex'>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
      </section>
    </>
  )
}