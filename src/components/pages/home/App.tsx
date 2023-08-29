"use client"

import Filters from "./components/Filters"
import SearchBox from "./components/SearchBox"
import ResultsTable from "./components/ResultsTable"
import PageController from "./components/PageController"
import { useSearchStore } from "@/stores/use-search-store"
import NoNetwork from "@/components/utils/NoNetwork/NoNetwork"
import LoadingPage from "@/components/utils/LoadingPage/LoadingPage"
import CardModal from "../card/CardModal"

const App = () => {

  const {isFetchingCards, noNetwork, selectedCard, setSelectedCard, searchIndex} =  useSearchStore()

  if(isFetchingCards){
    return <LoadingPage/>
  }

  if(noNetwork){
    return <NoNetwork/>
  }

  return (
    <div className='group/app fixed inset-0 flex flex-col justify-center items-center pb-5'>
      <div className="w-full max-w-[1000px] h-full p-4 pt-10 flex flex-col items-center gap-7">
        <SearchBox/>
        <ResultsTable/>
        <PageController/>
        <Filters/>
        <CardModal 
        card={selectedCard}
        searchIndex={searchIndex}
        setSelectedCard={setSelectedCard}
        />
      </div>
    </div>
  )
}

export default App