import React, { useState } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'

export const SidebarItem = ({ sidebarExtended, item }) => {

  const [elementExtended, setElementExtended] = useState(false)

  return item.children ? (
    sidebarExtended ? (
      elementExtended ? (
        <div>
          <button
            className='side-text'
            onClick={() => setElementExtended(!elementExtended)}
          >
            <div>
              {item.expandedIcon}
              <span>{item.title}</span>
            </div>
            <MdExpandLess />
          </button>
          {item.children.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                className='side-text'
                key={index}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            )
          })}
        </div>
      ) : (
        <button
          className='side-text'
          onClick={() => setElementExtended(!elementExtended)}
        >
          <div>
            {item.collapsedIcon}
            <span>{item.title}</span>
          </div>
          <MdExpandMore />
        </button>
      )
    ) : elementExtended ? (
      <div>
        <button
          className='side-text'
          onClick={() => setElementExtended(!elementExtended)}
        >
          {item.expandedIcon}
          <MdExpandLess />
        </button>
        {item.children.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              className='side-text'
              key={index}
            >
              {item.icon}
            </NavLink>
          )
        })}
      </div>
    ) : (
      <button
        className='side-text'
        onClick={() => setElementExtended(!elementExtended)}
      >
        {item.collapsedIcon}
        <MdExpandMore />
      </button>
    )
  ) : sidebarExtended ? (
    <NavLink to={item.path} className='side-text'>
      {item.icon}
      <span>{item.title}</span>
    </NavLink>
  ) : (
    <NavLink to={item.path} className='side-text'>
      {item.icon}
    </NavLink>
  )
}
