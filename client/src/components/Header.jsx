// & Imports
// Packages
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Styling

// Images
import logoSq from '../assets/software-seller-icon.png'
import usersSq from '../assets/xp_assets/1111.ico'
import compSq from '../assets/xp_assets/123.ico'
import buySq from '../assets/xp_assets/160.ico'
import networkSq from '../assets/xp_assets/142.ico'
import sellSq from '../assets/xp_assets/425.ico'


//  & Default function
export default function Header(){
  // * Current user
  const [ user, setUser ] = useState('')

  // Put within a useEffect with currentUser as the condition to re-render
  useEffect(() => {
        const username = localStorage.getItem('ss-username')
        setUser(username)
    } , [localStorage.getItem('ss-username')])

  return(
    <>
      <header className='narrow-mode'>
        <nav>
        <Link to ='/'><img className='logo-icon' src={logoSq} alt='ss logo' />Home</Link>
        <Link to ='/buy'><img className='logo-icon random-padding' src={buySq} alt='buy logo' />Buy</Link>
        {(user !== null) && <Link to ='/sell'><img className='logo-icon' src={sellSq} alt='buy logo' />Sell</Link>}
        <Link to ='/reviews'><img className='logo-icon random-padding' src={networkSq} alt='comp logo' />Reviews</Link>
        {(user !== null) && <Link to ='/profile'><img className='logo-icon random-padding' src={compSq} alt='comp logo' />Profile</Link>}
        {(user === null) && <Link to ='/login' className='loggedOut'><img className='logo-icon' src={usersSq} alt='users logo' />Register/Login</Link>}
        </nav>
      </header>
    </>
  )
}