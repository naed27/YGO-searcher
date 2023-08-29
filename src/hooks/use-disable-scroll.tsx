"use client"

import { useCallback, useEffect, useRef } from "react"


const useDisableScroll = () => {
  
  const ref = useRef<HTMLDivElement>(null)

  const nullifyScrolling = (e: any) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const bind = () => ({ ref })

  const enableScrolling = useCallback(() => {
    ref.current?.removeEventListener('wheel', nullifyScrolling);
    ref.current?.removeEventListener('touchmove', nullifyScrolling, true);
  },[ref])

  useEffect(()=>{
    if(!ref.current)return

    const element = ref.current

    element.addEventListener('wheel', nullifyScrolling);
    element.addEventListener('touchmove', nullifyScrolling, false);

    return ()=> {
      enableScrolling()
    }

  },[enableScrolling])

  return { bind }
}

export default useDisableScroll