import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './sidebar_data'
import './navbar.css'

function Navbar () {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => {
    setSidebar(!sidebar)
    /*if (sidebar) {
      document.getElementsByClassName('contentContainer')[0].classList.remove('contentMarginWide')
      document.getElementsByClassName('contentContainer')[0].classList.add('contentMarginNarrow')
    }
    else {
      document.getElementsByClassName('contentContainer')[0].classList.remove('contentMarginNarrow')
      document.getElementsByClassName('contentContainer')[0].classList.add('contentMarginWide')
    }*/
  }
  return (
    <div>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle' onClick={showSidebar}>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
