import {ArrowLeft, ArrowRight} from 'lucide-react'
import { useSearchStore } from '@/stores/use-search-store';

function PageController (){
  
  const {downPageNumber,upPageNumber,pageNumber,maxPageOfTable} = useSearchStore()

  return (
    <div className="relative bg-accent text-sm w-full max-w-[240px] flex justify-between items-center gap-4 border border-border rounded-[20px] shadow-md select-none">

      <div 
      onClick={downPageNumber}
      className="h-10 flex-grow flex justify-center items-center">
      </div>

      <div 
      className="w-fit h-full text-center flex justify-center items-center">
        {`Page ${pageNumber} of ${maxPageOfTable}`}
      </div>

      <div 
      onClick={upPageNumber}
      className="h-10 flex-grow flex justify-center items-center">
      </div>

      <div className='absolute inset-0 flex flex-row justify-between items-center px-4 pointer-events-none'>
        <ArrowLeft size={'22px'} strokeWidth={'1.5px'}/>
        <ArrowRight  size={'22px'} strokeWidth={'1.5px'}/>
      </div>
    </div>  
  )
}

export default PageController
