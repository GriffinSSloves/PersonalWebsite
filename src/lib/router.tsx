import { AppLayout } from '@/layouts/AppLayout'
import { AboutMePage } from '@/pages/content/AboutMePage'
import { BlogPage } from '@/pages/content/BlogPage'
import { BooksPage } from '@/pages/content/BooksPage'
import { ContactMePage } from '@/pages/content/ContactMePage'
import { FriendsPage } from '@/pages/content/FriendsPage'
import { GamingPage } from '@/pages/content/GamingPage'
import { HomePage } from '@/pages/content/HomePage'
import { ProjectsPage } from '@/pages/content/ProjectsPage'
import { StatusPage } from '@/pages/content/StatusPage'
import { ErrorPage } from '@/pages/system/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'

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
                    element: <ProjectsPage />
                },
                {
                    path: 'about',
                    element: <AboutMePage />
                },
                {
                    path: 'contact',
                    element: <ContactMePage />
                },
                {
                    path: 'books',
                    element: <BooksPage />
                },
                {
                    path: 'gaming',
                    element: <GamingPage />
                },
                {
                    path: 'friends',
                    element: <FriendsPage />
                }
                // Future Ideas
                // {
                //     path: 'blog',
                //     element: <BlogPage />
                // },
                // {
                //     path: 'status',
                //     element: <StatusPage />
                // }
            ],
            errorElement: <ErrorPage />
        }
    ],
    {
        // These are enabled here to prevent warnings, I'm neutral about whether they should be enabled or not
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true
        }
    }
)
