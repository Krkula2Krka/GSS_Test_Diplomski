import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/sidebar/sidebar'

export const Root = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}