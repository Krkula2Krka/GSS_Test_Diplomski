// libraries
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

// components
import { ErrorPage } from '../components/error/errorPage'
import { Sidebar } from '../components/sidebar/sidebar'
import { RetractableSidebar } from '../components/sidebar/retractableSidebar'

export const Root = () => {
    const location = useLocation()
    return (
        <ErrorBoundary key={location.pathname} FallbackComponent={ErrorPage}>
            {window.innerWidth > 891 ? <Sidebar /> : <RetractableSidebar />}
            <div className="content">
                <Outlet />
            </div>
        </ErrorBoundary>
    )
}
