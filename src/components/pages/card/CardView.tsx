"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import Name from "./components/Name"
import Details from "./components/Details"
import { useRouter } from "next/navigation"
import Controls from "./components/Controls"
import { useSearchStore } from "@/stores/use-search-store"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import ImageViewer from "./components/ImageViewer"
import LoadingPage from "@/components/utils/LoadingPage/LoadingPage"
import NoNetwork from "@/components/utils/NoNetwork/NoNetwork"

interface Props {
  cardId: string
  inModal?: boolean
}

const CardView = ({cardId, inModal = false}: Props) => {

  const { searchedCards, isFetchingCards, noNetwork } = useSearchStore()
  const cardIndex = searchedCards.findIndex(({id})=>`${id}`===cardId)
  const card = searchedCards[cardIndex]
  
  const router = useRouter()
  const viewWrapperRef = useRef<HTMLDivElement>(null)
  const gotohome = () => inModal && router.back()
  useOnClickOutside(viewWrapperRef, gotohome)

  if(isFetchingCards){
    return <LoadingPage/>
  }

  if(noNetwork){
    return <NoNetwork/>
  }

  if(!card){
    return <div>Card does not exist</div>
  }
  
  const {name, card_images} = card

  return (
    <div className='fixed inset-0 flex bg-black/80 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden p-5'>

      <div 
      ref={viewWrapperRef}
      className='flex flex-col h-full max-h-[800px] bg-background w-full max-w-[550px] items-center justify-center p-3 pb-7 pt-3 rounded-lg m-auto'>
        
        {inModal && (
          <div className='flex items-center w-full h-4 justify-end'>
            <button 
            aria-label='close modal'
            onClickCapture={gotohome}
            className='aspect-square h-5 p-0 rounded-md ml-auto'>
              <X className="w-full h-full text-foreground"/>
            </button>
          </div>
        )}
        
        <div className='w-full p-2 pt-0 flex flex-col h-full gap-2'>
          <Name cardName={name}/>
          <ImageViewer 
          inModal={inModal}
          cardName={name} 
          cardImages={card_images} 
          cardIndex={cardIndex}/>
          <Details card={card}/>
          {inModal&&<Controls/>}
        </div>

      </div>

    </div>
  )
}

export default CardView