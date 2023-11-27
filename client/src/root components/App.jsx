// css
import '../css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

// Components
import { LoginForm } from '../components/form/loginForm'
import { Root } from './root'
import { RootUi } from './rootUi'
import { PageNotFound } from '../utils/error/pageNotFound'
import { UnauthorizedAccess } from '../utils/error/unauthorizedAccess'
import { DbForm } from '../components/form/dbForm'

// Pages
import { TakeTest } from '../pages/takeTest'
import { Home } from '../pages/home'

// queries
import { loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '../queries/areaQueries'
import { ErrorPage } from '../utils/error/errorPage'

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
            errorElement: <ErrorPage />,
            children: [
                {
                    element: <RootUi />,
                    children: [
                        {
                            path: '/getAllAreas',
                            lazy: async () => {
                                const { GetAllAreas } = await import(
                                    '../pages/getAllAreas'
                                )
                                return { Component: GetAllAreas }
                            },
                            loader: areasLoader(queryClient)
                        },
                        {
                            path: '/getAllUsers',
                            lazy: async () => {
                                const { GetAllUsers } = await import(
                                    '../pages/getAllUsers'
                                )
                                return { Component: GetAllUsers }
                            }
                        },
                        {
                            path: '/settings',
                            lazy: async () => {
                                const { Settings } = await import(
                                    '../pages/settings'
                                )
                                return { Component: Settings }
                            }
                        },
                        {
                            path: '/userResults/:GSS_identification',
                            lazy: async () => {
                                const { UserResults } = await import(
                                    '../pages/userResults'
                                )
                                return { Component: UserResults }
                            }
                        },
                        {
                            path: '/testResult/:id',
                            lazy: async () => {
                                const { TestResult } = await import(
                                    '../pages/testResult'
                                )
                                return { Component: TestResult }
                            }
                        },
                        {
                            path: '/areaDetails/:id',
                            lazy: async () => {
                                const { AreaDetails } = await import(
                                    '../pages/areaDetails'
                                )
                                return { Component: AreaDetails }
                            }
                        },
                        {
                            path: '/questionDetails/:id',
                            lazy: async () => {
                                const { QuestionDetails } = await import(
                                    '../pages/questionDetails'
                                )
                                return { Component: QuestionDetails }
                            }
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
                    loader: loggedInLoader(queryClient)
                },
                {
                    path: '/unauthorized',
                    element: <UnauthorizedAccess />
                },
                {
                    path: '*',
                    element: <PageNotFound />
                }
            ]
        }
    ])

    useEffect(() => {
        const loader = document.querySelector('.loading-wrapper')
        loader?.classList?.remove('loading-wrapper')
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
    )
}
