import { useSearchStore } from '@/stores/use-search-store';
import { useRouter } from 'next/navigation';


export default function Controls() {

  const router = useRouter()
  const { setSelectedCard } = useSearchStore()
  const closeViewer = ()=>{
    setSelectedCard(null)
    router.back()
  }
  
  return (
    <div className="w-full flex flex-wrap justify-center items-center mt-2">
      <button 
      className="w-full h-full min-height-[30px] bg-accent hover:bg-accent-hover border border-border p-2 flex justify-center items-center cursor-default flex-grow basis-[30px]"
      onClick={closeViewer}>
        Close
      </button>
    </div>
  )
}