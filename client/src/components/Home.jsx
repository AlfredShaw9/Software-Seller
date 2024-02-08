// & Imports
// * Packages

// * Images
import keyboard from '../assets/xp_assets/keyboard.png'
import regImg from '../assets/log-reg.png'

// & Default function
export default function Home(){
  
  return(
    <>
      <div className='window formWindow welcomeWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Livin&apos; La Vista Loca</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <img src={regImg} />
        <section className='welcome'>
          <div className='welcomeHeader'>
          <img src={keyboard} alt='keyboard'/>
          <h5>Press Buy-Sell-Reviews to begin</h5>
          </div>
          <p>Find the (used software) key to your happiness. Browse our extensive range of <b>quality</b> second hand software bundles available to bid on & win at <em>competitive</em> prices. (N.B. No refunds)</p>
          <p>For more coding practice, press help.</p>
          <a target='_blank' rel='noreferrer' href="https://flukeout.github.io/">Help</a>
        </section>
      </div>
    </>
  )
}