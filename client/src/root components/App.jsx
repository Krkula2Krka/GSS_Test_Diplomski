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
import toast from 'react-hot-toast'

// Components
import { LoginForm } from '../components/loginForm'
import { Root } from './root'
import { PageNotFound } from '../components/error/pageNotFound'
import { RegistrationForm } from '../components/registrationForm'
import { Toaster } from 'react-hot-toast'
import { ErrorPage } from '../components/error/errorPage'

// Pages
import { TakeTest } from '../pages/takeTest'
import { Home } from '../pages/home'

// queries
import { loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '../queries/areaQueries'
import { usersLoader } from '../queries/userQueries'
import { questionsLoader } from '../queries/questionQueries'
import { answersLoader } from '../queries/answerQueries'

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    },
    queryCache: new QueryCache({
      onError: error => {
        if (error.message === 'Failed to fetch') {
          toast.remove()
          toast.error('Сервер је пао.')
        }
      }
    }),
    mutationCache: new MutationCache({
      onError: error => {
        if (error.message === 'Network Error') {
          toast.remove()
          toast.error('Сервер је пао.')
        }
      }
    })
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/getAllAreas',
          lazy: async () => {
            const { GetAllAreas } = await import('../pages/getAllAreas')
            return { Component: GetAllAreas }
          },
          loader: areasLoader(queryClient),
          errorElement: <ErrorPage />
        },
        {
          path: '/getAllUsers',
          lazy: async () => {
            const { GetAllUsers } = await import('../pages/getAllUsers')
            return { Component: GetAllUsers }
          },
          loader: usersLoader(queryClient),
          errorElement: <ErrorPage />
        },
        {
          path: '/userResults/:GSS_identification',
          lazy: async () => {
            const { UserResults } = await import('../pages/userResults')
            return { Component: UserResults }
          },
          loader: questionsLoader(queryClient),
          errorElement: <ErrorPage />
        },
        {
          path: '/areaDetails/:id',
          lazy: async () => {
            const { AreaDetails } = await import('../pages/areaDetails')
            return { Component: AreaDetails }
          },
          loader: questionsLoader(queryClient),
          errorElement: <ErrorPage />
        },
        {
          path: '/questionDetails/:id',
          lazy: async () => {
            const { QuestionDetails } = await import('../pages/questionDetails')
            return { Component: QuestionDetails }
          },
          loader: answersLoader(queryClient),
          errorElement: <ErrorPage />
        },
        {
          path: '/credentialsForTest',
          element: <LoginForm navigateToLocation='/takeTest' />
        },
        {
          path: '/registration',
          element: <RegistrationForm />
        }
      ]
    },
    {
      path: '/takeTest/:id',
      element: <TakeTest />,
      loader: loggedInLoader(queryClient),
      errorElement: <ErrorPage />
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  )
}
