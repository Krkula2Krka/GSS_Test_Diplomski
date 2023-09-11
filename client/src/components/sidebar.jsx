import React, { useState } from 'react'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { SidebarData } from './sidebar_data'
import './css/sidebar.css'
import { SidebarItem } from './sidebarItem'

export const Sidebar = () => {
   
  const [sidebar, setSidebar] = useState(false)

  return (
    <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
      <ul className='side-menu-items'>
        <li
          className='sidebar-toggle close-menu'
          onClick={() => setSidebar(!sidebar)}
        >
          <div className='toggle-sidebar-button'>
            {sidebar ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </div>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index}>
              <SidebarItem sidebarExtended={sidebar} item={item} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}