// libraries
import React from 'react'
import { NavLink } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

// components
import { SidebarData } from './sidebar_data'

// css
import '../../css/sidebar.css'

const setNavLinkClasses = (pathname, id) => {
  const paths = []
  if (id === 0) {
    paths.push('/credentialsForTest')
    paths.push('/registration')
  }
  if (id === 1) {
    paths.push('/areaDetails')
    paths.push('/questionDetails')
  }
  if (id === 2) {
    paths.push('/userResults')
  }
  return paths.some(path => pathname.includes(path))
    ? 'side-icon active'
    : 'side-icon'
}

export const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <nav className='side-menu'>
      <ul>
        {SidebarData.map(item => {
          return (
            <li key={item.id}>
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip>
                    <label className='tooltip-label'>{item.title}</label>
                  </Tooltip>
                }
              >
                <NavLink
                  className={setNavLinkClasses(pathname, item.id)}
                  to={item.path}
                >
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
