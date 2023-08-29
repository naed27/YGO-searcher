import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { Queuer, useSearchStore } from '@/stores/use-search-store';
import { ChangeEvent,  useState } from 'react'

export default function Atk ({queueQuery}:{queueQuery: Queuer}){
  
  const { query } = useSearchStore()
  const [minPlaceHolder,setMinPlaceHolder] = useState(`${query.atk.min}`);
  const [maxPlaceHolder,setMaxPlaceHolder] = useState(`${query.atk.max}`);

  const minAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input > 100000000000) return
    setMinPlaceHolder(`${input}`)
    queueQuery({atk:{min:input,max:query.atk.max}})
  }

  const maxAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input > 100000000000) return
    setMaxPlaceHolder(`${input}`)
    queueQuery({atk:{max:input,min:query.atk.min}})
  }

  const disable = query.type!=='Monster'

  return (
    <div className="w-full flex flex-row h-8">

      <div className={cn("w-[70px] h-full flex items-center pl-1", disable && 'text-muted')}>
        {`Attack`}
      </div>

      <div className="flex-[6] h-full flex items-center">

        <Input 
        id="atk-min-field"
        disabled={disable}
        className="h-full w-full bg-accent"
        onChange={minAtkHandler} 
        value={
          (query.type!=='Monster') ? '' :
          (minPlaceHolder==='-1') ? '' : minPlaceHolder
        }/>

        <div className={cn("px-1",disable&&'text-muted-foreground')}>
          {`<`}
        </div>

        <Input 
        id="atk-max-field"
        disabled={disable}
        className="h-full w-full bg-accent"
        onChange={maxAtkHandler} 
        value={
          (query.type!=='Monster') ? '' :
          (maxPlaceHolder==='-1') ? '' : maxPlaceHolder
        }/>

      </div>
    </div>  
  )
}
