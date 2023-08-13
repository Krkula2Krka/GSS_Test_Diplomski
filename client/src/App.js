import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Areas from './pages/areas'
import AddArea from './pages/addArea'

function App () {
  return (
    <div className='App'>
      <Router>
        <nav>
          <Link className='navBarLink' to='/'>
            Почетна страна
          </Link>
          <Link className='navBarLink' to='/areas'>
            Прегледај све области
          </Link>
          <Link className='navBarLink' to='/addArea'>
            Додај нову област
          </Link>
        </nav>
        <Routes>
          <Route path='/areas' element={<Areas />} />
          <Route path='/addArea' element={<AddArea />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
