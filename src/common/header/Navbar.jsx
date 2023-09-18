import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>
      <header className='header'>
        <div className='container d_flex res'>
          <div className='catgrories d_flex'>
            <span className='fa-solid fa-border-all'></span>
            <h4>
              Sustainable Brands
            </h4>
          </div>

          <div className='navlink '>
            <ul className={MobileMenu ? "nav-links-MobileMenu reslink" : "link f_flex capitalize reslink"} onClick={() => setMobileMenu(false)}>
              {}
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/'>Login</Link>
              </li>
              <li>
                <Link to='/pages'>Shop Now</Link>
              </li>
              <li>
                <Link to='/purchase-history'>Purchase History</Link>
              </li>
              
              <li>
                <Link to='/contact'>contact</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
