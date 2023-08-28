import './css/App.css'
import { NavbarShownContext } from './helper/context'
import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

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
        <Route path='/takeTest/:id' element={<TakeTest />} />
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
    <NavbarShownContext.Provider value={{ navbarShown, setNavbarShown }}>
      <RouterProvider router={router} />
    </NavbarShownContext.Provider>
  )
}