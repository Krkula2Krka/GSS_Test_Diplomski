// css
import '../css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

// Components
import { LoginForm } from '../components/form/loginForm'
import { Root } from './root'
import { PageNotFound } from '../utils/error/pageNotFound'
import { UnauthorizedAccess } from '../utils/error/unauthorizedAccess'
import { ErrorPage } from '../utils/error/errorPage'
import { DbForm } from '../components/form/dbForm'

// Pages
import { TakeTest } from '../pages/takeTest'
import { Home } from '../pages/home'

// queries
import { loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '../queries/areaQueries'
import { testQuestionsLoader } from '../queries/questionQueries'
import { shouldInitLoader } from '../queries/loginQueries'

export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/getAllAreas',
                    lazy: async () => {
                        const { GetAllAreas } = await import(
                            '../pages/getAllAreas'
                        )
                        return { Component: GetAllAreas }
                    },
                    loader: areasLoader(queryClient),
                    errorElement: <ErrorPage />
                },
                {
                    path: '/getAllUsers',
                    lazy: async () => {
                        const { GetAllUsers } = await import(
                            '../pages/getAllUsers'
                        )
                        return { Component: GetAllUsers }
                    },
                    errorElement: <ErrorPage />
                },
                {
                    path: '/settings',
                    lazy: async () => {
                        const { Settings } = await import('../pages/settings')
                        return { Component: Settings }
                    },
                    loader: shouldInitLoader(queryClient),
                    errorElement: <ErrorPage />
                },
                {
                    path: '/userResults/:GSS_identification',
                    lazy: async () => {
                        const { UserResults } = await import(
                            '../pages/userResults'
                        )
                        return { Component: UserResults }
                    },
                    errorElement: <ErrorPage />
                },
                {
                    path: '/areaDetails/:id',
                    lazy: async () => {
                        const { AreaDetails } = await import(
                            '../pages/areaDetails'
                        )
                        return { Component: AreaDetails }
                    },
                    errorElement: <ErrorPage />
                },
                {
                    path: '/questionDetails/:id',
                    lazy: async () => {
                        const { QuestionDetails } = await import(
                            '../pages/questionDetails'
                        )
                        return { Component: QuestionDetails }
                    },
                    errorElement: <ErrorPage />
                }
            ]
        },
        {
            index: true,
            element: <Home />
        },
        {
            path: '/credentialsForTest',
            element: <LoginForm navigateToLocation='/takeTest' />
        },
        {
            path: '/credentialsForDb',
            element: <DbForm navigateToLocation='/getAllAreas' />
        },
        {
            path: '/takeTest/:id',
            element: <TakeTest />,
            loader: async () => {
                const isUserLoggedIn = await loggedInLoader(queryClient)
                return await testQuestionsLoader(queryClient, isUserLoggedIn)
            },
            errorElement: <ErrorPage />
        },
        {
            path: '/unauthorized',
            element: <UnauthorizedAccess />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ])

    useEffect(() => {
        const loader = document.querySelector('.loading-wrapper')
        loader?.classList?.remove('loading-wrapper')
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </QueryClientProvider>
    )
}
