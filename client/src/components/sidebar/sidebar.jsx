// libraries
import React from 'react'
import { NavLink } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

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
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip>
                    <label>{item.title}</label>
                  </Tooltip>
                }
              >
                <NavLink className='side-icon' to={item.path}>
                  {item.icon}
                </NavLink>
              </OverlayTrigger>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
