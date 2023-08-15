import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import GetAllAreas from './views/getAllAreas'
import AddArea from './views/addArea'
import AreaDetails from './views/areaDetails'
import AddQuestion from './views/addQuestion'

function App () {
  return (
    <div className='App'>
      <Router>
        <nav>
          <Link className='navBarLink' to='/'>
            Почетна страна
          </Link>
          <Link className='navBarLink' to='/getAllAreas'>
            Прегледај све области
          </Link>
          <Link className='navBarLink' to='/addArea'>
            Додај нову област
          </Link>
          <Link className='navBarLink' to='/addQuestion'>
            Додај ново питање
          </Link>
        </nav>
        <Routes>
          <Route path='/getAllAreas' element={<GetAllAreas />} />
          <Route path='/addArea' element={<AddArea />} />
          <Route path='/addQuestion' element={<AddQuestion />} />
          <Route path='/areaDetails/:id' element={<AreaDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
