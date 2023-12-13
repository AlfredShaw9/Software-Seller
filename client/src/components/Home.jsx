// & Imports
// * Packages
import { Link } from 'react-router-dom'
import React from 'react'

// * Images
import logoSq from '../assets/software-seller-icon.png'

// & Default function
export default function Home(){
  
  return(
    <>
      <div className='window buyWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Home</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <section className='welcome'>
          <h2>Livin&apos; La Vista Loca</h2>
          <Link to='#'><img src={ logoSq } alt='ss logo' /></Link>
          <h4>Find the (used software) key to your happiness</h4>
        </section>
      </div>
    </>
  )
}