// & Imports
// Packages
import { Link } from 'react-router-dom'

// Styling

// Images
import logoSq from '../assets/software-seller-icon.png'


//  & Default function
export default function Header(){
  return(
    <>
      <header>
        <div className='logos'>
          <Link to ='/'><img className='logo-icon' src={logoSq} alt='ss logo' /></Link>
        </div>
        <nav>
        <Link to ='/buy'>Buy</Link>
        <Link to ='/sell'>Sell</Link>
        <Link to ='/reviews'>Reviews</Link>
        <Link to ='/profile'>Profile</Link>
        <Link to ='/login' className='loggedOut'>Register/Login</Link>
        </nav>
      </header>
    </>
  )
}