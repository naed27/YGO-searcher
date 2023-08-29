"use client"

import { YGOCard } from "@/lib/types"
import { cacheApiData, fetchCardTypes } from "@/lib/utils"
import { useSearchStore } from "@/stores/use-search-store"
import { useEffect } from "react"

const useLoadApp = () => {

  const {setCards, setSearchedCards, setCardTypes, setIsFetchingCards, setNoNetwork} = useSearchStore()
  
  useEffect(()=>{
    const fetchAllCards = async()=>{
      const result = await cacheApiData('https://db.ygoprodeck.com/api/v7/cardinfo.php');
      if(!result.success) return setNoNetwork(true)
      const cards: YGOCard[] = result.data.data;
      setCards(cards)
      setSearchedCards(cards)
      setCardTypes(fetchCardTypes(cards))
      setIsFetchingCards(false);
    }

    fetchAllCards();
  },[setCards, setSearchedCards, setCardTypes, setNoNetwork, setIsFetchingCards])

}

export default useLoadApp