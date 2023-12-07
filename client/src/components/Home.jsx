// & Imports
// * Packages
import { Link } from 'react-router-dom'
import React from 'react'

// * Styling
import { Fade, ScaleFade, Slide, SlideFade, Collapse, Button } from '@chakra-ui/react'

// * Images
import logoRect from '../assets/ss_logo_rect.png'
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
        <h1>Livin' La Vista Loca</h1>
        <Link to='#'><img src={ logoRect } alt='ss logo' /></Link>
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