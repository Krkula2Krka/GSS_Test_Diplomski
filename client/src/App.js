import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import GetAllAreas from './views/getAllAreas'
import AddArea from './views/addArea'

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
        </nav>
        <Routes>
          <Route path='/getAllAreas' element={<GetAllAreas />} />
          <Route path='/addArea' element={<AddArea />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
