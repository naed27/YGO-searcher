"use client"

import { useSearchStore } from "@/stores/use-search-store"
import { Filter, Search } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"

const SearchBox = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const {query, setShowFilters, search} = useSearchStore()
  const [placeHolder,setPlaceHolder] = useState(query.name);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryName = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      search({name:input});
    }, 200));
  }

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='w-full text-sm text-foreground'>
      <div className="w-full flex justify-center items-center border h-[42px] border-border bg-accent rounded-[20px] gap-2 overflow-hidden shadow-inner">
        
        <div 
        onClick={handleIconClick} 
        className="pl-3 h-full flex justify-center items-center">
          <Search className="h-5 w-5 text-input-icon" strokeWidth={'2px'}/>
        </div>

        <input 
        id="main-search-box"
        placeholder="Search cards.."
        ref={inputRef}
        type="text"
        value={placeHolder}
        spellCheck="false"
        onChange={queryName}
        autoComplete="off"
        className="w-full h-full bg-transparent outline-none"/>

        <div 
        onClick={()=>setShowFilters(true)}
        className="flex justify-center items-center h-full px-2 border-l border-border gap-1 pr-3 hover:bg-accent-hover select-none cursor-default">
          <Filter className="h-[18px] w-[18px] text-input-icon" strokeWidth={'2px'}/>
          Filter
        </div>
      </div>
    </div>
  )
}

export default SearchBox
