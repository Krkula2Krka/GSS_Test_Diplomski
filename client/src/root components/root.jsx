// libraries
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

// components
import { ErrorPage } from '../utils/error/errorPage'

export const Root = () => {
    const location = useLocation()
    return (
        <ErrorBoundary key={location.pathname} FallbackComponent={ErrorPage}>
            <div className='bg-main'></div>
            <Outlet />
        </ErrorBoundary>
    )
}
