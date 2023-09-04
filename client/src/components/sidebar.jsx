import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './sidebar_data'
import './css/sidebar.css'

export const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false)

  return (
    <div>
      <div className='sidebar'>
        <div className='menu-bars'>
          <FaIcons.FaBars onClick={() => setSidebar(true)} />
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle' onClick={() => setSidebar(false)}>
            <div className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </div>
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