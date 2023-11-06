// css
import '../css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
    QueryClient,
    QueryClientProvider,
    MutationCache,
    QueryCache
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast'

// Components
import { LoginForm } from '../components/form/loginForm'
import { Root } from './root'
import { PageNotFound } from '../components/error/pageNotFound'
import { RegistrationForm } from '../components/form/registrationForm'
import { ErrorPage } from '../components/error/errorPage'

// Pages
import { TakeTest } from '../pages/takeTest'
import { Home } from '../pages/home'

// queries
import { loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '../queries/areaQueries'
import { usersLoader } from '../queries/userQueries'
import { testQuestionsLoader } from '../queries/questionQueries'
import { useEffect } from 'react'
import { DbForm } from '../components/form/dbForm'

export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        },
        queryCache: new QueryCache({
            onError: () => {
                toast.remove()
                toast.error('Сервер је пао.')
            }
        }),
        mutationCache: new MutationCache({
            onError: () => {
                toast.remove()
                toast.error('Сервер је пао.')
            }
        })
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
                    loader: usersLoader(queryClient),
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
            path: '/registration',
            element: <RegistrationForm />
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
