import CardImage from "./CardImage";
import { YGOCard } from "@/lib/types";
import { cn, parseLimit, pushUrl } from "@/lib/utils";
import { useSearchStore } from "@/stores/use-search-store";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { TextOverFlowAutoSlider } from "./TextOverFlowAutoSlider";


interface Props {
  card?: YGOCard | null
  cardSize: {width:number, height:number}
  isInvisible?: boolean
}


const Card = ({card, cardSize}:Props) => {

  const descRef = useRef<HTMLDivElement>(null)
  const { query, setSelectedCard, setSearchIndex, searchedCards } = useSearchStore()

  const limit = useMemo(()=>{
    if(card===null || card===undefined) return -1
    return parseLimit(query.cardGame,card.banlist_info)
  },[ card, query.cardGame ]);

  const cardHref = card ? `/card/${card.id}` : '/'

  const viewCard = useCallback(()=>{
    if( card === null || card === undefined )return
    pushUrl(cardHref)
    setSelectedCard(card);
    setSearchIndex(searchedCards.findIndex(c=>c.id===card.id))
  },[card, setSelectedCard, setSearchIndex, searchedCards, cardHref])

  useEffect(()=>{
    const cleaner = TextOverFlowAutoSlider({wrapperRef: descRef})
    return cleaner
  },[card?.id])

  return (
    <button
      onClickCapture={viewCard}
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

              <p className={"w-full h-fit whitespace-nowrap text-start"}>
                {card.name}
              </p>

            </div>
          </div>
        </div>
      </>
      )}
    </button>
  );

}

export default Card




