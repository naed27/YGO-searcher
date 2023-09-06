"use client"

import { useSearchStore } from "@/stores/use-search-store"
import { useEffect } from "react"

interface Props {
  callback?: () => void
}

const defaultCallback = () => {}

const useOnPopState = ({callback = defaultCallback}: Props = {}) => {

  const { setSelectedCard } = useSearchStore()
  
  useEffect(()=>{
    
    const handleBackPress = () => {
      const {origin: originHref, href} = window.location
      const currentHref = href.slice(0,-1)

      if(originHref === currentHref){
        setSelectedCard(null)
        callback()
      }
    }
    
    window.addEventListener('popstate',handleBackPress)

    return ()=> {
      window.removeEventListener('popstate',handleBackPress)
    }

  },[setSelectedCard, callback])

}

export default useOnPopState