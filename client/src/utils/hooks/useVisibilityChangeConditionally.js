import { useEffect, useRef } from 'react'

export const useVisibilityChangeConditionally = (callback, condition) => {
    const callbackRef = useRef(callback)
    useEffect(() => {
        if (condition) {
            const onMinimize = callbackRef.current
            document.addEventListener('visibilitychange', onMinimize)
            return () =>
                document.removeEventListener('visibilitychange', onMinimize)
        }
    }, [callback, condition])
}
