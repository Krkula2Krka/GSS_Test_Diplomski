import { useEffect } from 'react'

export const useStopScrolling = (condition) => {
    useEffect(() => {
        condition
            ? document.body.classList.add('stop-scrolling')
            : document.body.classList.remove('stop-scrolling')
        return () => document.body.classList.remove('stop-scrolling')
    }, [condition])
}
