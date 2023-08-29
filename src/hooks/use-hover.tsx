"use client"

import { useEffect, useRef } from "react"

interface Props {
  onHover?: () => void,
  onLeave?: () => void,
}

const defaultCallback = () => {}

const useHover = ({
  onHover=defaultCallback, 
  onLeave=defaultCallback
}: Props = {}) => {

  const ref = useRef(null)

  useEffect(()=>{
    if(!ref.current)return

    const setupListener = () => {
      if(!ref.current) return
      const element = ref.current as HTMLElement
      element.addEventListener('mouseenter', onHover)
      element.addEventListener('mouseleave', onLeave)
    }

    const removeListener = () => {
      if(!ref.current) return
      const element = ref.current as HTMLElement
      element.removeEventListener('mouseenter', onHover)
      element.removeEventListener('mouseleave', onLeave)
    }

    setupListener()

    return () => {
      removeListener()
    }

  },[onHover, onLeave])

  return ref
  
}

export default useHover