import { CardImage } from '@/lib/types';
import { useRef } from 'react';

interface Props {
  cardName: string,
  cardImages: CardImage[]
  limit:number,
  style?:React.CSSProperties
  showImages?:boolean
}

export default function CardImage ({
  cardName,
  cardImages,
  limit,
  style,
  showImages = true
}:Props) {

  const ref = useRef<HTMLDivElement>(null)

  return (
     <div 
     ref={ref}
     className="w-full h-full"> 
        {showImages&&(
        <img
        src={`${cardImages[0].image_url_small}`}  
        alt={`${cardName}'s_image`} 
        style={{
          width: `100%`,
          height:'100%',
          objectFit: 'fill'
        }}/>
        )}
        {limit<3&&(
          <div 
          className="absolute top-0 right-0 aspect-square h-[30%] z-[1] border border-red-600 rounded-full flex justify-center items-center bg-black/80"
          style={style}>
            {limit}
          </div>
        )}
      </div>
    
  )

}
