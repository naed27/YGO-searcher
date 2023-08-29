import Modal from "@/components/utils/Modal/Modal";
import { useSearchStore } from "@/stores/use-search-store";
import Name from "./filters/Name";
import Desc from "./filters/Desc";
import Keywords from "./filters/Keywords";
import Type from "./filters/Type";
import SubType from "./filters/SubType";
import Level from "./filters/Level";
import Atk from "./filters/Atk";
import Def from "./filters/Def";
import Limit from "./filters/Limit";
import CardGame from "./filters/CardGame";
import AdvancedButtons from "./filters/AdvancedButtons";
import { memo } from "react";

function Filters (){
  
  const { setShowFilters, showFilters, search, queueQuery } = useSearchStore();
  const onClickOutside = () => setShowFilters(false)

  if(!showFilters){
    return null
  }

  return (
    <Modal 
    onClickOutside={onClickOutside}
    className="relative max-w-[550px] rounded-xl shadow-2xl bg-background w-full flex flex-col justify-center border-border text-xs gap-2 p-4">
      
      <Name queueQuery={queueQuery}/>
      <Desc queueQuery={queueQuery}/>
      <Keywords queueQuery={queueQuery}/>
      <Type search={search}/>
      <SubType search={search}/>
      <Level search={search}/>
      <Atk queueQuery={queueQuery}/>
      <Def queueQuery={queueQuery}/>
      <Limit search={search}/>
      <CardGame search={search}/>
      <AdvancedButtons search={search}/> 

    </Modal>
  )
}

export default memo(Filters)