import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store';
import { cn } from '@/lib/utils';
import DropdownMenu from '@/components/dean-ui/DropdownMenu/DropdownMenu';

export default function Level ({search}:{search: Searcher}){
  
  const { query, cardTypes } = useSearchStore()
  const { levels } = cardTypes

  const levelChoices = query.type === 'Monster' ? levels : [];

  const minLevelHandler = (level: string)=> search({level:{ min:Number(level), max:query.level.max }})
  const maxLevelHandler = (level: string)=> search({level:{ max:Number(level), min:query.level.min }})

  const disable = query.type!=='Monster'

  return (
    <div className="w-full flex flex-row h-8">
      <div className={cn("w-[70px] h-full flex items-center pl-1", disable && 'text-muted')}>
        {`Level`}
      </div>

      <div className="flex-[6] h-full flex items-center">

        <DropdownMenu
        disabled={disable}
        defaultPlaceHolder=''
        noItemsPlaceholder='No level'
        onValueChange={minLevelHandler}
        initialValue={`${query.level.min}`}
        defaultSelectedValue={{label:'None', value: `${initialQuery.level.min}`}}
        items={levelChoices.map((type)=>({ value: `${type}`, label: `${type}` }))}/>

        <div className={cn("px-1",disable&&'text-muted-foreground')}>
          {`<`}
        </div>

        <DropdownMenu
        disabled={disable}
        defaultPlaceHolder=''
        noItemsPlaceholder='No level'
        initialValue={`${query.level.max}`}
        onValueChange={maxLevelHandler}
        defaultSelectedValue={{label:'None', value: `${initialQuery.level.max}`}}
        items={levelChoices.map((type)=>({ value: `${type}`, label: `${type}` }))}/>

      </div>
    </div>  
  )
}
