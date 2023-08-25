import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GetAllAreas from './pages/getAllAreas'
import AddArea from './pages/addArea'
import AreaDetails from './pages/areaDetails'
import AddQuestion from './pages/addQuestion'
import Home from './pages/home'
import TakeTest from './pages/takeTest'
import LoginForm from './components/loginForm'
import { NavbarShownContext } from './helper/context'
import { useState } from 'react'

function App () {
  const [ navbarShown, setNavbarShown ] = useState(false)
  return (
    <NavbarShownContext.Provider value={{ navbarShown, setNavbarShown }}>
      <Router>
        <Routes>
          <Route path='/getAllAreas' element={<GetAllAreas />} />
          <Route path='/addArea' element={<AddArea />} />
          <Route path='/addQuestion' element={<AddQuestion />} />
          <Route path='/areaDetails/:id' element={<AreaDetails />} />
          <Route path='/' element={<Home />} />
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
          <Route path='/takeTest/:id' element={<TakeTest />} />
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
        </Routes>
      </Router>
    </NavbarShownContext.Provider>
  )
}

export default App
