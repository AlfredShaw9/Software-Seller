// & Imports
// Packages
import { Link } from 'react-router-dom'

// Styling

// Images
import logoSq from '../assets/ss_logo_sq.png'


//  & Default function
export default function Header(){
  return(
    <>
      <header>
        <div className='logos'>
          <Link to ='/'><img className='logo-icon' src={logoSq} alt='ss logo' /></Link>
        </div>
        <nav>
        <Link to ='/'>Buy</Link>
        <Link to ='/'>Sell</Link>
        <Link to ='/'>Reviews</Link>
        <Link to ='/'>Placeholder</Link>
        <Link to ='/login' className='loggedOut'>Register/Login</Link>
        </nav>
      </header>
    </>
  )
}