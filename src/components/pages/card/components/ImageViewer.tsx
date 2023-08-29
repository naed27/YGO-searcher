import { useSearchStore } from "@/stores/use-search-store";
import Link from "next/link";
import { memo } from "react";
import ImagePreview from "./ImagePreview";
import { CardImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  cardName: string,
  cardImages: CardImage[],
  cardIndex: number,
  inModal?: boolean,
}

function ImageViewer({ cardName, cardImages, cardIndex, inModal = false }: Props) {

  const { searchedCards } = useSearchStore()
  const prevCard = searchedCards[cardIndex-1]
  const nextCard = searchedCards[cardIndex+1]
  const prevHref = prevCard?`/card/${prevCard.id}`:'/'
  const nextHref = nextCard?`/card/${nextCard.id}`:'/'
  const prevImages = prevCard ? [...prevCard.card_images] : []
  const nextImages = nextCard ? [...nextCard.card_images] : []
  const sideCardsImages = [...prevImages , ...nextImages]

  return (
    <div className="relative flex-grow w-full flex justify-between">

      
      
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <ImagePreview sideCardsImages={sideCardsImages} cardImages={cardImages} cardName={cardName} className="z-[3] pointer-events-auto"/>
      </div>

      {inModal&&(
        <div className="absolute inset-0 flex justify-between items-center">

          <Link 
          href={prevHref}
          replace={true}
          className={cn(
            'z-[3] w-[25px] h-[25px] min-[300px]:h-full min-[300px]:w-[40px] min-[300px]:p-2 flex justify-start items-center cursor-default bg-accent hover:bg-accent-hover border border-border',
            !prevCard&&'text-muted pointer-events-none'
          )}>
              <ChevronLeft/>
          </Link>

          <Link   
          href={nextHref}
          replace={true}
          className={cn(
            'z-[3] w-[25px] h-[25px] min-[300px]:h-full min-[300px]:w-[40px] min-[300px]:p-2 flex justify-end items-center cursor-default bg-accent hover:bg-accent-hover border border-border',
            !nextHref&&'text-muted pointer-events-none'
          )}>
              <ChevronRight/>
          </Link>

        </div>
      )}

     


    </div>
  )
}


export default memo(ImageViewer)
