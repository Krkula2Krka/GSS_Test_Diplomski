import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GetAllAreas from './pages/getAllAreas'
import AddArea from './pages/addArea'
import AreaDetails from './pages/areaDetails'
import AddQuestion from './pages/addQuestion'
import Navbar from './components/navbar'

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
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
