'use client'

import { cn, delay } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"



const IntroAnimation = () => {

  const ref = useRef(null)
  const path = usePathname()
  const [showAnimation, setShowAnimation] = useState(path==='/')

  useEffect(()=>{
    if(!ref.current) return
    const element = ref.current as HTMLElement

    const animation = async ()=>{
      element.setAttribute('data-show-hero',"true")

      await delay(1000)
      element.setAttribute('data-show-punchline',"true")
      
      await delay(1000)
      element.setAttribute('data-show-punchline',"false")

      await delay(900)
      element.setAttribute('data-show-hero',"false")

      await delay(700)
      element.setAttribute('data-fade-away',"true")

      await delay(1000)
      setShowAnimation(false)
    }
    animation()
  },[])

  if(!showAnimation){
    return null
  }

  return (
    <div 
    ref={ref}
    data-fade-away={false}
    data-show-hero={null}
    data-show-punchline={null}
    className={cn(
      "group/intro fixed inset-0 bg-background z-[9999] flex flex-col justify-center items-center",
      "transition-opacity duration-1000 ease-in-out",
      "opacity-1",
      "data-[fade-away=true]:opacity-0",

    )}>
      <div className="w-fit px-4 flex flex-col justify-center items-center">

        <div className="overflow-hidden w-full">
          <div className={cn(
            "px-2 transition-transform duration-1000 ease-in-out",
            "translate-y-full",
            "group-data-[show-hero=false]/intro:translate-y-full",
            "group-data-[show-hero=true]/intro:translate-y-0",
            "font-normal text-[55px]",
          )}>
            <p>DEAN</p>
          </div>
        </div>

        <div className={cn(
          "relative overflow-hidden select-none flex justify-center items-center w-full text-foreground",
          "text-[12px]"
        )}>
          <p>
            Creating apps that shine
          </p>
          <div className={cn(
            "absolute inset-0 bg-background transition-transform duration-1000 ease-in-out",
            "translate-x-0",
            "group-data-[show-punchline=true]/intro:translate-x-full",
            "group-data-[show-punchline=false]/intro:translate-x-full",
          )}/>
          <div className={cn(
            "absolute inset-0 bg-background transition-transform duration-1000 ease-in-out",
            "-translate-x-full",
            "group-data-[show-punchline=true]/intro:-translate-x-full",
            "group-data-[show-punchline=false]/intro:translate-x-0",
          )}/>
        </div>

      </div>
    </div>
  )
}

export default IntroAnimation