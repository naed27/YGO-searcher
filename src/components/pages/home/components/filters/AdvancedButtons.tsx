import { useCallback } from 'react'
import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store'

export default function AdvancedButtons ({search}:{search: Searcher}) {
  
  const { setShowFilters } = useSearchStore()
  const onClickReset = useCallback(()=>search(initialQuery),[search])
  const onClickSearch = useCallback(()=>setShowFilters(false),[setShowFilters])

  return (
    <div className="w-full flex flex-row h-8 mt-2 mb-2">

      <button 
      onClick={onClickReset}
      className="select-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-default disabled:cursor-not-allowed w-[100px] rounded-sm mr-1 h-10 bg-accent text-foreground border border-border flex justify-center items-center hover:bg-accent-hover">
          Reset
      </button>

      <button 
        className="select-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-default disabled:cursor-not-allowed w-full h-10 rounded-sm bg-accent text-foreground border border-border flex justify-center items-center hover:bg-accent-hover"
        onClick={onClickSearch}>
        Search | Close
      </button>

    </div>  
  )
}
