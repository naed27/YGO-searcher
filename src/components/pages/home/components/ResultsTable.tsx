"use client"

import { useSearchStore } from "@/stores/use-search-store"
import Card from "./Card"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useItemsPerRow from "@/hooks/use-items-per-row"
import useItemsPerColumn from "@/hooks/use-items-per-column"
import { getMaxPageCount } from "@/lib/utils"
import { YGOCard } from "@/lib/types"


const FLEX_GAP = 2;
const ITEM_WIDTH_BASIS = 280;
const ITEM_HEIGHT_BASIS = 60;

const ResultsTable = () => {

  const {searchedCards,pageNumber,setMaxPageOfTable} = useSearchStore();

  const tableRef = useRef<HTMLDivElement>(null)
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCards,[searchedCards]);
  const itemsPerRow = useItemsPerRow({cardWidth: ITEM_WIDTH_BASIS, flexGap: FLEX_GAP, tableRef})
  const itemsPerColumn = useItemsPerColumn({cardHeight: ITEM_HEIGHT_BASIS, flexGap: FLEX_GAP, tableRef})
  
  const render = useCallback((pool:YGOCard[],currentPageNumber:number)=>{
    if(!tableRef.current) return []
    const containerHeight = tableRef.current.offsetHeight
    const range = itemsPerColumn*itemsPerRow;
    const start = (currentPageNumber-1) * range;
    const end = start + range;
    const cardHeight = containerHeight/itemsPerColumn;
    const cardWidth = cardHeight*0.68566775244;
    const cardSize = {width:cardWidth, height:cardHeight};

    return [
      ...pool.slice(start,end).map((card)=>(<Card card={card} key={`table_item_${card.id}`} cardSize={cardSize}/>)),
      <Card key='ygo_invi_1' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_2' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_3' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_4' cardSize={{...cardSize,height:0}}/>,
    ]
  },[itemsPerColumn, itemsPerRow])


  useEffect(()=>{
    const table = render(pool,pageNumber);
    setJSXTable(table);
  },[  pageNumber, pool, render ]);

  useEffect(()=>{
    setMaxPageOfTable(getMaxPageCount({
      displayCount: itemsPerColumn*itemsPerRow, 
      totalItemCount: searchedCards.length
    }))
  },[ setMaxPageOfTable, searchedCards, itemsPerColumn, itemsPerRow ])

  return (
    <div 
    ref={tableRef}
    className="relative w-full flex-grow">
      <div className="absolute top-0 left-0 w-full h-auto flex flex-row flex-wrap items-start">
        {JSXTable}
      </div>
    </div>
  )
}

export default ResultsTable
