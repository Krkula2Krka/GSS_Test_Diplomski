import './css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Components
import { LoginForm } from './components/loginForm'
import { Root } from './components/root'
import { PageNotFound } from './components/pageNotFound'

// Pages
import { TakeTest } from './pages/takeTest'
import { Home } from './pages/home'

// queries
import { loggedInLoader } from './pages/queries/userQueries'
import { areasLoader } from './pages/queries/areaQueries'
import { questionsLoader } from './pages/queries/questionQueries'

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
            const { GetAllAreas } = await import('./pages/getAllAreas')
            return { Component: GetAllAreas }
          },
          loader: areasLoader(queryClient)
        },
        {
          path: '/addArea',
          lazy: async () => {
            const { AddArea } = await import('./pages/addArea')
            return { Component: AddArea }
          }
        },
        {
          path: '/addQuestion',
          lazy: async () => {
            const { AddQuestion } = await import('./pages/addQuestion')
            return { Component: AddQuestion }
          },
          loader: areasLoader(queryClient)
        },
        {
          path: '/areaDetails/:id',
          lazy: async () => {
            const { AreaDetails } = await import('./pages/areaDetails')
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
    </QueryClientProvider>
  )
}
