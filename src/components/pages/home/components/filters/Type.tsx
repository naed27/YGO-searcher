import DropdownMenu from '@/components/dean-ui/DropdownMenu/DropdownMenu';
import { Searcher, initialQuery, useSearchStore } from '@/stores/use-search-store';
import { useCallback, useMemo } from 'react';


function Type ({search}:{search:Searcher}) {


  const {query,cardTypes} = useSearchStore()

  const {primaryTypes,spellTypes,monsterTypes,trapTypes} = cardTypes;

  const primaryTypeHandler = useCallback((input: string) => search({type:input}),[search])
  const secondaryTypeHandler =  useCallback((input:string)=> search({subtype:input}),[search]);

  const secondaryTypes = useMemo(()=>{
    switch(query.type){
      case 'Monster': return monsterTypes;
      case 'Spell': return spellTypes;
      case 'Trap': return trapTypes;
      default:return [];
    }
  },[query.type,spellTypes,monsterTypes,trapTypes]);


  return (
    <div className="relative w-full flex flex-row h-8">

      <div className="w-[70px] h-full flex items-center pl-1">Type</div>
      <div className="flex-[6] h-full flex items-center">

        <DropdownMenu
        defaultPlaceHolder=''
        initialValue={query.type}
        noItemsPlaceholder='No types'
        onValueChange={primaryTypeHandler}
        defaultSelectedValue={{label:'None', value: initialQuery.type}}
        items={primaryTypes.map((type)=>({ value: type, label: type }))}/>

        <div className="px-1"></div>

        <DropdownMenu
        defaultPlaceHolder=''
        disabled={query.type===''}
        initialValue={query.subtype}
        noItemsPlaceholder='No subtypes'
        onValueChange={secondaryTypeHandler}
        defaultSelectedValue={{label:'None', value: initialQuery.subtype}}
        items={secondaryTypes.map((type)=>({ value: type, label: type }))}/>

      </div>
    </div>  
  )
}

export default Type
