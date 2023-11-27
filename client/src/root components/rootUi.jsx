// libraries
import { Outlet } from 'react-router-dom'

// components
import { Sidebar } from '../components/sidebar/sidebar'
import { RetractableSidebar } from '../components/sidebar/retractableSidebar'

export const RootUi = () => {
    return (
        <>
            {window.innerWidth > 891 ? <Sidebar /> : <RetractableSidebar />}
            <div className='content'>
                <Outlet />
            </div>
        </>
    )
}
