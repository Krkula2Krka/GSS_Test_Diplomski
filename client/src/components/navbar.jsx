import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './sidebar_data'
import './css/navbar.css'
import { NavbarShownContext } from '../helper/context'

export const Navbar = () => {
  const { navbarShown, setNavbarShown } = useContext(NavbarShownContext)
  console.log('Navbar Rendered')
  return (
    <div>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={() => setNavbarShown(true)} />
        </Link>
      </div>
      <nav className={navbarShown ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle' onClick={() => setNavbarShown(false)}>
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

export const NavbarMemo = memo(Navbar)