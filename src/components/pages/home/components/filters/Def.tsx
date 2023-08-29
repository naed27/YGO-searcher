
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { ChangeEvent, useState } from 'react'
import { Queuer, useSearchStore } from '@/stores/use-search-store';

export default function Def ({queueQuery}:{queueQuery: Queuer}){
  
  const { query } = useSearchStore()
  const [minPlaceHolder,setMinPlaceHolder] = useState(`${query.def.min}`);
  const [maxPlaceHolder,setMaxPlaceHolder] = useState(`${query.def.max}`);

  const minDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input > 100000000000) return
    setMinPlaceHolder(`${input}`)
    queueQuery({def:{min:input,max:query.def.max}})
  }

  const maxDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input > 100000000000) return
    setMaxPlaceHolder(`${input}`)
    queueQuery({def:{max:input,min:query.def.min}})
  }

  const disable = query.type!=='Monster'

  return (
    <div className="w-full flex flex-row h-8">

      <div className={cn("w-[70px] h-full flex items-center pl-1", disable && 'text-muted')}>
        {`Defense`}
      </div>

      <div className="flex-[6] h-full flex items-center">
       
        <Input 
        id="def-min-field"
        disabled={disable}
        className="h-full w-full bg-accent"
        onChange={minDefHandler} 
        value={
          (query.type!=='Monster') ? '' :
          (minPlaceHolder==='-1') ? '' : minPlaceHolder
        }/>

        <div className={cn("px-1",disable&&'text-muted-foreground')}>
          {`<`}
        </div>

        <Input 
        id="def-max-field"
        disabled={disable}
        className="h-full w-full bg-accent"
        onChange={maxDefHandler} 
        value={
          (query.type!=='Monster') ? '' :
          (maxPlaceHolder==='-1') ? '' : maxPlaceHolder
        }/>
        
      </div>
    </div>  
  )
}
