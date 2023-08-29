import { Input } from '@/components/ui/Input';
import { Queuer, useSearchStore } from '@/stores/use-search-store';
import { ChangeEvent, useEffect, useState } from 'react';

function Name ({queueQuery}:{queueQuery: Queuer}) {
  
  const {query} = useSearchStore()
  const [placeHolder,setPlaceHolder] = useState(query.name);

  const queryName = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    queueQuery({name:input})
  }

  useEffect(()=>{
    setPlaceHolder(query.name);
  },[query.name])

  return (
    <div className="w-full flex flex-row h-8">
      <div className="w-[70px] h-full flex items-center pl-1">Name</div>
      <div className="flex-[6] h-full flex items-center">
        <Input 
          id="name-field"
          className="h-full w-full bg-accent"
          onChange={queryName} 
          value={placeHolder}
        />
      </div>
    </div>  
  )
}

export default Name
