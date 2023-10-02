import { useRef, useEffect } from 'react'

export const useUnloadConditionally = (callback, condition) => {
  const callbackRef = useRef(callback)
  useEffect(() => {
    if (condition) {
      const onUnload = callbackRef.current
      window.addEventListener('beforeunload', onUnload)
      return () => window.removeEventListener('beforeunload', onUnload)
    }
  }, [callbackRef, condition])
}
