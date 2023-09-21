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
import { RegistrationForm } from '../components/registrationForm'
import { UserAlreadyExists } from '../components/error/userAlreadyExists'

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
          path: '/getAllUsers',
          lazy: async () => {
            const { GetAllUsers } = await import('../pages/getAllUsers')
            return { Component: GetAllUsers }
          },
          loader: usersLoader(queryClient)
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
          path: '/questionDetails/:id',
          lazy: async () => {
            const { QuestionDetails } = await import('../pages/questionDetails')
            return { Component: QuestionDetails }
          },
          loader: answersLoader(queryClient)
        },
        {
          path: '/credentialsForTest',
          element: <LoginForm navigateToLocation='/takeTest' />
        },
        {
          path: '/wrongCredentials',
          element: <WrongCredentials />
        },
        {
          path: '/userAlreadyExists/:GSS_identification',
          element: <UserAlreadyExists />
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
