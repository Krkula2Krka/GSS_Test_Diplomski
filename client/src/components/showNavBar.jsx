import React from 'react'
import { useEffect, useState } from 'react'

function ShowNavBar ({ children }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (window.location.href.includes('/takeTest')) setShow(false)
    else setShow(true)
  }, [])
  return <div>
    {show && children}
  </div>
}

export default ShowNavBar
