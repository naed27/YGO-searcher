'use client'

import useImagesPreloader from "@/hooks/use-images-preloader"
import { CardImage } from "@/lib/types"
import { Frown, Loader } from "lucide-react"
import { HTMLAttributes, memo } from "react"

interface Props extends HTMLAttributes<HTMLElement>{
  cardName: string,
  cardImages: CardImage[],
  sideCardsImages: CardImage[],
}

function ImagePreview({cardName, cardImages, className, sideCardsImages}:Props) {

  const { isLoading } = useImagesPreloader({imageUrls: cardImages.map(({image_url})=>image_url || '')})
  useImagesPreloader({imageUrls: sideCardsImages.map(({image_url})=>image_url || '')})

  if(cardImages.length===0){
    return (
      <div className="flex flex-col items-center gap-2">
        <p>No image</p>
        <Frown strokeWidth={`1.7px`}/>
      </div>
    )
  }

  if(isLoading.end){
    return <Loader className="animate-spin"/>
  }

  return (
    <img 
    src={`${cardImages[0].image_url}`}  
    alt={`${cardName}'s_image`} 
    className={className}
    style={{
      height:'100%',
      objectFit: 'contain'
    }}/>
  )
}


export default memo(ImagePreview)