import { useEffect, useRef } from 'react'

export const useOnWindowResizeConditionally = (callback, condition) => {
  const callbackRef = useRef(callback)
  useEffect(() => {
    if (condition) {
      const onResize = callbackRef.current
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }
  }, [callback, condition])
}