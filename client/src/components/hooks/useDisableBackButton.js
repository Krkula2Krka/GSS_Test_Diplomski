import { useEffect } from 'react'

const useDisableBackButton = () => {
  const disableBackButton = () => window.history.go(1)
  useEffect(() => {
    window.history.pushState(null, null, window.location.href)
    window.addEventListener('popstate', disableBackButton)
    return () => window.removeEventListener('popstate', disableBackButton)
  }, [])
}

export default useDisableBackButton