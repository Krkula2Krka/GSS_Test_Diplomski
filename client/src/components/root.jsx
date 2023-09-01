import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'

export const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
