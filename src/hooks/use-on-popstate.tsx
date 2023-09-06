"use client"

import { useSearchStore } from "@/stores/use-search-store"
import { useEffect } from "react"

interface Props {
  callback?: () => void
}

const defaultCallback = () => {}

const useOnPopState = ({callback = defaultCallback}: Props = {}) => {

  const { setSelectedCard, setShowFilters } = useSearchStore()
  
  useEffect(()=>{
    
    const handleBackPress = () => {
      const {origin: originHref, href} = window.location
      const currentHref = href.slice(0,-1)

      if(originHref === currentHref){
        setSelectedCard(null)
        setShowFilters(false)
        callback()
      }
    }
    
    window.addEventListener('popstate',handleBackPress)

    return ()=> {
      window.removeEventListener('popstate',handleBackPress)
    }

  },[setSelectedCard, callback, setShowFilters])

}

export default useOnPopState