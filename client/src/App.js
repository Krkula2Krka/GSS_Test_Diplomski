import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [areas, setAreas] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/areas').then((response) => {
      setAreas(response.data)
    })
  }, [])
  return (
    <div className="App">
      {areas.map((area, key) => {
        return (
          <div key={key}>
            <h1>{area.area_name}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default App;
