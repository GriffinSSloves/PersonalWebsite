import { Outlet } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export const AppLayout = () => {
    return (
        <div className='min-h-screen  flex flex-col'>
            <AppHeader />
            <main className='flex-grow'>
                <div className='container mx-auto max-w-6xl px-4 py-8'>
                    <Outlet />
                </div>
            </main>
            <AppFooter />
        </div>
    )
}
