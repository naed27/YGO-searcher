
import { useCallback, useMemo } from 'react'
import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store';
import DropdownMenu from '@/components/dean-ui/DropdownMenu/DropdownMenu';

export default function Limit ({search}:{search: Searcher}){
  
  const { query } = useSearchStore()

  const queryLimit = useCallback((input:string)=> search({ limit: Number(input) }),[search]);
  const limitChoices = useMemo(()=>[0,1,2,3],[]);

  return (
    <div className="w-full flex flex-row h-8">
      <div className="w-[70px] h-full flex items-center pl-1">Limit</div>
      <div className="flex-[6] h-full flex items-center">
        <DropdownMenu
        defaultPlaceHolder=''
        initialValue={`${query.limit}`}
        noItemsPlaceholder='No limit'
        onValueChange={queryLimit}
        defaultSelectedValue={{label:'None', value:`${initialQuery.limit}`}}
        items={limitChoices.map((type)=>({ value: `${type}`, label: `${type}` }))}/>
      </div>
    </div>
  )
}
