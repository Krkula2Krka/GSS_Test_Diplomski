import React, { useState } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'

export const SidebarItem = ({ sidebarExtended, item }) => {
    
  const [elementExtended, setElementExtended] = useState(false)

  if (item.children)
    return (
      <div>
        {sidebarExtended || elementExtended ? (
          <div
            className='side-text'
            onClick={() => setElementExtended(!elementExtended)}
          >
            <NavLink to='#'>
              <span>
                {item.icon}
                <span>{item.title}</span>
              </span>
              <span className='expand-icon'>
                {elementExtended ? <MdExpandLess /> : <MdExpandMore />}
              </span>
            </NavLink>
            {elementExtended ?? (
              <div className='sidebar-submenu'>
                {item.children.map((item, index) => {
                  return (
                    <li key={index}>
                      <SidebarItem
                        sidebarExtended={elementExtended}
                        item={item}
                      />
                    </li>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div
            className='side-text'
            onClick={() => setElementExtended(!elementExtended)}
          >
            <NavLink to='#'>
              <span>{item.icon}</span>
              <span>
                {elementExtended ? <MdExpandLess /> : <MdExpandMore />}
              </span>
            </NavLink>
            {elementExtended ?? (
              <div className='sidebar-submenu'>
                {item.children.map((item, index) => {
                  return (
                    <li key={index}>
                      <SidebarItem
                        sidebarExtended={elementExtended}
                        item={item}
                      />
                    </li>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    )
  else
    return (
      <div>
        {sidebarExtended || elementExtended ? (
          <div className='side-text'>
            <NavLink to={item.path}>
              <span>
                {item.icon}
                <span>{item.title}</span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className='side-text'>
            <NavLink to={item.path}>
              <span>{item.icon}</span>
            </NavLink>
          </div>
        )}
      </div>
    )
}
