import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GetAllAreas from './pages/getAllAreas'
import AddArea from './pages/addArea'
import AreaDetails from './pages/areaDetails'
import AddQuestion from './pages/addQuestion'
import Navbar from './components/navbar'
import Home from './pages/home'
import CredentialsForTest from './pages/credentialsForTest'
import TakeTest from './pages/takeTest'
import Registration from './pages/registration'

function App () {
  return (
    <div>
      <Router>
        <div className='main'>
          <div className='sidebar'>
            <Navbar />
          </div>
          <div className='content'>
            <Routes>
              <Route path='/getAllAreas' element={<GetAllAreas />} />
              <Route path='/addArea' element={<AddArea />} />
              <Route path='/addQuestion' element={<AddQuestion />} />
              <Route path='/areaDetails/:id' element={<AreaDetails />} />
              <Route path='/home' element={<Home />} />
              <Route path='/credentialsForTest' element={<CredentialsForTest />} />
              <Route path='/takeTest/:id' element={<TakeTest />} />
              <Route path='/registration' element={<Registration />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
