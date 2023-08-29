import { Input } from '@/components/ui/Input';
import { Queuer, useSearchStore } from '@/stores/use-search-store';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Keywords ({queueQuery}:{queueQuery: Queuer}) {
  
  const {query} = useSearchStore()
  const [placeHolder,setPlaceHolder] = useState(query.keywords);

  const queryKeywords = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    queueQuery({keywords:input})
  }

  useEffect(()=>{
    setPlaceHolder(query.keywords);
  },[query.keywords])

  return (
    <div className="w-full flex flex-row h-8">
      <div className="w-[70px] h-full flex items-center pl-1">Keywords</div>
      <div className="flex-[6] h-full flex items-center">
        <Input 
          id="keywords-field"
          className="h-full w-full bg-accent"
          onChange={queryKeywords} 
          value={placeHolder}
        />
      </div>
    </div>  
  )
}
