// & Imports
// * Packages
import { Link } from 'react-router-dom'

// * Styling
import CloseButton from 'react-bootstrap/CloseButton';

// * Images
import logoRect from '../assets/ss_logo_rect.png'
import windows2000 from '../assets/windows2000.png'

// & Default function
export default function Home(){
  return(
    <>
      <section className='mainHero collapsible'>
        <h1>Livin' La Vista Loca</h1>
        <Link to='#'><img src={ logoRect } alt='ss logo' /></Link>
        <h4>Find the (used software) key to your happiness</h4>
        {/* <CloseButton /> */}
      </section>
      <section className='previewIndex'>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
        <img src={ windows2000 } alt='windows logo'/>
      </section>
    </>
  )
}