// libraries
import React from 'react'
import { NavLink } from 'react-router-dom'

// components
import { SidebarData } from './sidebar_data'

// css
import '../../css/sidebar.css'

export const Sidebar = () => {
  return (
    <nav className='side-menu'>
      <ul className='side-menu-items'>
        {SidebarData.map(item => {
          return (
            <li key={item.id}>
              <NavLink to={item.path} className='side-text'>
                {item.icon}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
