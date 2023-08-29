import './css/App.css'
import { NavbarShownContext } from './helper/context'

// Libraries
import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

// Components
import { LoginForm } from './components/loginForm'
import { Root } from './components/root'

// Pages
import { TakeTest, checkLoginForTesting } from './pages/takeTest'
import { AreaDetails } from './pages/areaDetails'
import { AddQuestion } from './pages/addQuestion'
import { AddArea } from './pages/addArea'
import { GetAllAreas } from './pages/getAllAreas'
import { Home } from './pages/home'

export const App = () => {
  const [navbarShown, setNavbarShown] = useState(false)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/getAllAreas' element={<GetAllAreas />} />
        <Route path='/addArea' element={<AddArea />} />
        <Route path='/addQuestion' element={<AddQuestion />} />
        <Route path='/areaDetails/:id' element={<AreaDetails />} />
        <Route
          path='/takeTest/:id'
          element={<TakeTest />}
          loader={checkLoginForTesting}
        />
        <Route
          path='/credentialsForTest'
          element={
            <LoginForm
              navigateToLocation='/takeTest'
              mainHeaderContent='Унесите ваше податке да би сте наставили:'
              isRegestration={false}
              submitButtonContent='Настави'
            />
          }
        />
        <Route
          path='/registration'
          element={
            <LoginForm
              navigateToLocation='/'
              mainHeaderContent='Регистрација:'
              isRegestration={true}
              submitButtonContent='Региструј се'
            />
          }
        />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={new QueryClient({defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }})}>
      <NavbarShownContext.Provider value={{ navbarShown, setNavbarShown }}>
        <RouterProvider router={router} />
      </NavbarShownContext.Provider>
    </QueryClientProvider>
  )
}
