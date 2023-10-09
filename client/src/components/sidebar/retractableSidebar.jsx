// libraries
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// components
import { SidebarData } from './sidebar_data'

// css
import '../../css/sidebar.css'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'

export const RetractableSidebar = () => {
  const [open, setOpen] = useState(0)
  return (
    <div>
      {open === 1 ? (
        <div>
          <button
            className='hamburger-button open-hamburger-button'
            onClick={() => setOpen(0)}
          >
            <ImCross />
          </button>
          <nav className='side-menu full-witdh'>
            <ul>
              {SidebarData.map(item => {
                return (
                  <li key={item.id}>
                    <NavLink onClick={() => setOpen(0)} to={item.path}>
                      <div className='open-mobile-sidebar-element'>
                        <div className='side-icon-mobile'>{item.icon}</div>
                        <div className='side-text'>{item.title}</div>
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      ) : (
        <button className='hamburger-button' onClick={() => setOpen(1)}>
          <GiHamburgerMenu />
        </button>
      )}
    </div>
  )
}
