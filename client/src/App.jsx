import './css/App.css'

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Components
import { LoginForm } from './components/loginForm'
import { Root } from './components/root'

// Pages
import { TakeTest } from './pages/takeTest'
import { AreaDetails } from './pages/areaDetails'
import { AddQuestion } from './pages/addQuestion'
import { AddArea } from './pages/addArea'
import { GetAllAreas } from './pages/getAllAreas'
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
          element: <GetAllAreas />,
          loader: areasLoader(queryClient)
        },
        {
          path: '/addArea',
          element: <AddArea />
        },
        {
          path: '/addQuestion',
          element: <AddQuestion />,
          loader: areasLoader(queryClient)
        },
        {
          path: '/areaDetails/:id',
          element: <AreaDetails />,
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
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
