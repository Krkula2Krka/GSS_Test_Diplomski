import './css/App.css'
import { NavbarShownContext } from './helper/context'

// Libraries
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Components
import { LoginForm } from './components/loginForm'
import { Root } from './components/root'

// Pages
import { TakeTest, loggedInLoader } from './pages/takeTest'
import { AreaDetails } from './pages/areaDetails'
import { AddQuestion, areasLoader } from './pages/addQuestion'
import { AddArea } from './pages/addArea'
import { GetAllAreas } from './pages/getAllAreas'
import { Home } from './pages/home'

export const App = () => {
  const [navbarShown, setNavbarShown] = useState(false)

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
          element: <GetAllAreas />
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
          element: <AreaDetails />
        },
        {
          path: '/takeTest/:id',
          element: <TakeTest />,
          loader: loggedInLoader(queryClient)
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
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <NavbarShownContext.Provider value={{ navbarShown, setNavbarShown }}>
        <RouterProvider router={router} />
      </NavbarShownContext.Provider>
    </QueryClientProvider>
  )
}
