
import { YGOCardGame } from '@/lib/types';
import { useCallback, useMemo } from 'react'
import DropdownMenu from '@/components/dean-ui/DropdownMenu/DropdownMenu';
import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store';

export default function CardGame ({search}:{search: Searcher}){
  
  const {query} = useSearchStore()

  const queryCardGame = useCallback((input: string)=> search({cardGame: input as YGOCardGame}),[search]);
  const cardGameChoices = useMemo(()=>['O.C.G.', 'T.C.G.'],[]);

  return (
    <div className="w-full flex flex-row my-1 h-7">
      <div className="w-[70px] h-full flex items-center pl-1">TCG/OCG</div>
      <div className="flex-[6] h-full flex items-center">
        <DropdownMenu
        defaultSelectedValue={{label:'Default (T.C.G.)', value: initialQuery.cardGame}}
        defaultPlaceHolder={query.cardGame} 
        initialValue={`${query.cardGame}`}
        noItemsPlaceholder='No limit'
        onValueChange={queryCardGame}
        items={cardGameChoices.map((type)=>({ value: `${type}`, label: `${type}` }))}/>
      </div>
    </div>
  )
}
