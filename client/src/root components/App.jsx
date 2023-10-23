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
import { getUsersBatchQuery, loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '../queries/areaQueries'
import { questionsLoader } from '../queries/questionQueries'
import { answersLoader } from '../queries/answerQueries'
import { testQuestionsLoader } from '../queries/questionQueries'

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

  queryClient.prefetchInfiniteQuery(getUsersBatchQuery())

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  )
}
