"use client"

import { useEffect, useRef } from "react"

const useClickableDiv = () => {

  const clickableDivRef = useRef(null)

  useEffect(()=>{
    if(!clickableDivRef.current)return

    const handleKeypress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const clickableDiv = event.target as HTMLDivElement;
        clickableDiv.click();
      }
    };
    
    const clickableDiv = clickableDivRef.current as HTMLDivElement

    clickableDiv.tabIndex = 0
    clickableDiv.addEventListener('keypress',handleKeypress)

    return () => {
      clickableDiv.removeEventListener('keypress',handleKeypress)
    }
  },[])

  return {clickableDivRef}
}

export default useClickableDiv