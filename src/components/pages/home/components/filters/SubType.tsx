import DropdownMenu from '@/components/dean-ui/DropdownMenu/DropdownMenu';
import { cn } from '@/lib/utils';
import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store';

export default function SubType ({search}:{search: Searcher}){

  const { query, cardTypes } = useSearchStore()

  const {races,attributes} = cardTypes

  const raceChoices = query.type==='Monster'?races:[];
  const attrChoices = query.type==='Monster'?attributes:[];

  const raceHandler = (input:string)=>search({race:input});
  const attrHandler = (input:string)=>search({attribute:input});

  const disable = query.type!=='Monster'

  return (
    <div className="w-full flex flex-row h-8">

      <div className={cn("w-[70px] h-full flex items-center pl-1", disable && 'text-muted')}>
        {`Sub-Type`}
      </div>
      
      <div className="flex-[6] h-full flex items-center">

        <DropdownMenu
        disabled={disable}
        defaultPlaceHolder=''
        initialValue={query.race}
        onValueChange={raceHandler}
        noItemsPlaceholder='No races'
        defaultSelectedValue={{label:'None', value: initialQuery.race}}
        items={raceChoices.map((type)=>({ value: type, label: type }))}/>
        
        <div className="px-1"/>

        <DropdownMenu
        disabled={disable}
        defaultPlaceHolder=''
        onValueChange={attrHandler}
        initialValue={query.attribute}
        noItemsPlaceholder='No Attributes'
        defaultSelectedValue={{label:'None', value: initialQuery.attribute}}
        items={attrChoices.map((type)=>({ value: type, label: type }))}/>
        
      </div>
    </div>
  )
}

