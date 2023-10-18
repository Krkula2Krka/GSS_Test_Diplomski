// libraries
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

// components
import { ErrorPage } from '../components/error/errorPage'
import { Sidebar } from '../components/sidebar/sidebar'
import { RetractableSidebar } from '../components/sidebar/retractableSidebar'

export const Root = props => {
  const location = useLocation()
  const setImageSource = props.setImageSource
  return (
    <ErrorBoundary key={location.pathname} FallbackComponent={ErrorPage}>
      {window.innerWidth > 891 ? <Sidebar /> : <RetractableSidebar />}
      <Outlet context={[setImageSource]} />
    </ErrorBoundary>
  )
}
