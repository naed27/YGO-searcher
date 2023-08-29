"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import Name from "./components/Name"
import Details from "./components/Details"
import Controls from "./components/Controls"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import ImageViewer from "./components/ImageViewer"
import { YGOCard } from "@/lib/types"

interface Props {
  card: YGOCard | null
  // eslint-disable-next-line no-unused-vars
  setSelectedCard: (input: YGOCard | null) => void | null,
  searchIndex: number | null
}

const CardModal = ({card, setSelectedCard, searchIndex}: Props) => {

  const viewWrapperRef = useRef<HTMLDivElement>(null)

  const gotohome = () => {
    setSelectedCard && setSelectedCard(null)
    window.history.back()
  }
  
  useOnClickOutside(viewWrapperRef, gotohome);

  if(card === null || searchIndex === null){
    return null
  }

  const {name, card_images, id} = card

  return (
    <div className='fixed inset-0 flex bg-black/80 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden p-5'>

      <div 
      ref={viewWrapperRef}
      className='flex flex-col h-full max-h-[800px] bg-background w-full max-w-[550px] items-center justify-center p-3 pb-7 pt-3 rounded-lg m-auto'>
        
        <div className='flex items-center w-full h-4 justify-end'>
          <button 
          aria-label='close modal'
          onClickCapture={gotohome}
          className='aspect-square h-5 p-0 rounded-md ml-auto'>
            <X className="w-full h-full text-foreground"/>
          </button>
        </div>
        
        <div className='w-full p-2 pt-0 flex flex-col h-full gap-2'>
          <Name key={`modal_name_${id}`} cardName={name}/>

          <ImageViewer
          inModal={true}
          cardName={name} 
          cardIndex={searchIndex}
          cardImages={card_images} 
          key={`modal_image_view_${id}`}/>

          <Details  
          card={card}
          key={`modal_details_${id}`}/>

          <Controls/>
        </div>

      </div>

    </div>
  )
}

export default CardModal