import { Input } from '@/components/ui/Input';
import { Queuer, useSearchStore } from '@/stores/use-search-store';
import { ChangeEvent, useEffect, useState } from 'react';

function Desc ({queueQuery}:{queueQuery: Queuer}) {
  
  const {query} = useSearchStore()
  const [placeHolder,setPlaceHolder] = useState(query.desc);

  const queryDesc = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    queueQuery({desc:input})
  }

  useEffect(()=>{
    setPlaceHolder(query.desc);
  },[query.desc])

  return (
    <div className="w-full flex flex-row h-8">
      <div className="w-[70px] h-full flex items-center pl-1">Desc</div>
      <div className="flex-[6] h-full flex items-center">
        <Input 
          id="desc-field"
          className="h-full w-full bg-accent"
          onChange={queryDesc} 
          value={placeHolder}
        />
      </div>
    </div>  
  )
}

export default Desc