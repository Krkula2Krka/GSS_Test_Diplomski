import { useEffect } from 'react'

const useDisableBackButton = condition => {
  const disableBackButton = () => window.history.go(1)
  useEffect(() => {
    if (condition) {
      window.history.pushState(null, null, window.location.href)
      window.addEventListener('popstate', disableBackButton)
      return () => window.removeEventListener('popstate', disableBackButton)
    }
  }, [condition])
}

export default useDisableBackButton
