import { YGOCard } from "@/lib/types";
import { cn, parseLimit } from "@/lib/utils";
import { useSearchStore } from "@/stores/use-search-store";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import CardImage from "./CardImage";
import { TextOverFlowAutoSlider } from "./TextOverFlowAutoSlider";


interface Props {
  card?: YGOCard | null
  cardSize: {width:number, height:number}
  isInvisible?: boolean
}


const Card = ({card, cardSize}:Props) => {

  const { query } = useSearchStore()
  const descRef = useRef<HTMLDivElement>(null)

  const limit = useMemo(()=>{
    if(card===null || card===undefined) return -1
    return parseLimit(query.cardGame,card.banlist_info)
  },[ card, query.cardGame ]);

  useEffect(()=>{

    const cleaner = TextOverFlowAutoSlider({wrapperRef: descRef})

    return cleaner
    
  },[card?.id])

  return (
    <Link
      shallow={true}
      href={card ? `/card/${card.id}` : '/'}
      className={cn(
        "relative flex flex-row items-center h-[60px] basis-[280px] flex-grow gap-2 hover:bg-accent-hover cursor-default",
        !card&&'pointer-events-none'
      )}
      style={{height: cardSize.height}}>
      {card&&(
      <>
        <div 
          className="relative h-full flex justify-center items-center"
          style={{width:`${cardSize.width}px`, minWidth:`${cardSize.width}px`}}>
          <CardImage cardName={card.name} cardImages={card.card_images} limit={limit}/>
        </div>

        <div className="relative h-full flex-grow text-sm">
          <div className="absolute inset-0 pr-4">

            <div 
            ref={descRef}
            className="relative w-full h-full flex items-center overflow-hidden">

              <p className={cn("w-full h-fit whitespace-nowrap")}>
                {card.name}
              </p>

            </div>
          </div>
        </div>
      </>
      )}
    </Link>
  );

}

export default Card




