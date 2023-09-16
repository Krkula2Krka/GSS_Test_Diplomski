import '../css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Components
import { LoginForm } from '../components/loginForm'
import { Root } from './root'
import { PageNotFound } from '../components/error/pageNotFound'
import { WrongCredentials } from '../components/error/wrongCredentials'

// Pages
import { TakeTest } from '../pages/takeTest'
import { Home } from '../pages/home'

// queries
import { loggedInLoader } from '../queries/userQueries'
import { areasLoader } from '..//queries/areaQueries'
import { questionsLoader } from '../queries/questionQueries'

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
          index: true,
          element: <Home />
        },
        {
          path: '/getAllAreas',
          lazy: async () => {
            const { GetAllAreas } = await import('../pages/getAllAreas')
            return { Component: GetAllAreas }
          },
          loader: areasLoader(queryClient)
        },
        {
          path: '/addQuestion',
          lazy: async () => {
            const { AddQuestion } = await import('../pages/addQuestion')
            return { Component: AddQuestion }
          },
          loader: areasLoader(queryClient)
        },
        {
          path: '/areaDetails/:id',
          lazy: async () => {
            const { AreaDetails } = await import('../pages/areaDetails')
            return { Component: AreaDetails }
          },
          loader: questionsLoader(queryClient)
        },
        {
          path: '/credentialsForTest',
          element: (
            <LoginForm
              navigateToLocation='/takeTest'
              mainHeaderContent='Унесите ваше податке да би сте наставили:'
              isRegestration={false}
              submitButtonContent='Настави'
            />
          )
        },
        {
          path: '/wrongCredentials',
          element: <WrongCredentials />
        },
        {
          path: '/registration',
          element: (
            <LoginForm
              navigateToLocation='/'
              mainHeaderContent='Регистрација:'
              isRegestration={true}
              submitButtonContent='Региструј се'
            />
          )
        }
      ]
    },
    {
      path: '/takeTest/:id',
      element: <TakeTest />,
      loader: loggedInLoader(queryClient)
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
    </QueryClientProvider>
  )
}