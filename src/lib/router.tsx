import { lazy, Suspense } from 'react'
import { AppLayout } from '@/layouts/AppLayout'
import { ErrorPage } from '@/pages/system/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/content/HomePage'

// Lazy load route components to reduce initial bundle size
const ProjectsPage = lazy(() => import('@/pages/content/ProjectsPage'))
const AboutMePage = lazy(() => import('@/pages/content/AboutMePage'))
const ContactMePage = lazy(() => import('@/pages/content/ContactMePage'))
const BooksPage = lazy(() => import('@/pages/content/BooksPage'))
const GamingPage = lazy(() => import('@/pages/content/GamingPage'))
const FriendsPage = lazy(() => import('@/pages/content/FriendsPage'))

const PageLoader = () => (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-pulse'>Loading...</div>
    </div>
)

const LazyRoute = ({ Component }: { Component: React.ComponentType }) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
)

export const AppRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'projects',
                    element: <LazyRoute Component={ProjectsPage} />
                },
                {
                    path: 'about',
                    element: <LazyRoute Component={AboutMePage} />
                },
                {
                    path: 'contact',
                    element: <LazyRoute Component={ContactMePage} />
                },
                {
                    path: 'books',
                    element: <LazyRoute Component={BooksPage} />
                },
                {
                    path: 'gaming',
                    element: <LazyRoute Component={GamingPage} />
                },
                {
                    path: 'friends',
                    element: <LazyRoute Component={FriendsPage} />
                }
            ],
            errorElement: <ErrorPage />
        }
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true
        }
    }
)
