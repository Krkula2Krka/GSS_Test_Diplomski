import { useEffect } from 'react'

export const useDisableBackButtonConditionally = condition => {
  useEffect(() => {
    if (condition) {
      const disableBackButton = () => window.history.go(1)
      window.history.pushState(null, null, window.location.href)
      window.addEventListener('popstate', disableBackButton)
      return () => window.removeEventListener('popstate', disableBackButton)
    }
  }, [condition])
}