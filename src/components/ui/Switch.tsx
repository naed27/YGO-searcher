"use client"

import { ComponentPropsWithoutRef, forwardRef } from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface Props extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  theme?: 'light' | 'dark',
  showSymbols?: boolean,
  sizeByHeight?: number
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl'
}

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  Props
>(({ 
  className, 
  theme = 'light',
  showSymbols = false,
  size = 50,
  ...props 
}, ref) => {


  return (
    <SwitchPrimitives.Root
      className={cn(

         // base class
        "group peer inline-flex aspect-[2/1] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    
        
        // theme class
        (()=>{
          switch (theme) {
            default: return 'data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-gray-600'
            case 'dark': return 'data-[state=unchecked]:bg-gray-600 data-[state=checked]:bg-gray-400'
          }
        })(),

        
        // size class
        (()=>{
          switch (size) {
            default: return 'h-[25px]'
            case 'xs': return 'h-[15px]'
            case 'sm': return 'h-[18px]'
            case 'md': return 'h-[21px]'
            case 'lg': return 'h-[30px]'
            case 'xl': return 'h-[35px]'
          }
        })(),

        
        // additional class
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
      className={cn(
        
         // base class
        "flex justify-center p-1 items-center pointer-events-none h-full aspect-square rounded-full shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
        
        // theme class
        (()=>{
          switch (theme) {
            default: return 'data-[state=unchecked]:bg-background data-[state=checked]:bg-background'
            case 'dark': return 'data-[state=unchecked]:bg-background data-[state=checked]:bg-background'
          }
        })(),

        // size class
        (()=>{
          switch (size) {
            default: return 'data-[state=checked]:translate-x-[25px]'
            case 'xs': return 'data-[state=checked]:translate-x-[15px]'
            case 'sm': return 'data-[state=checked]:translate-x-[18px]'
            case 'md': return 'data-[state=checked]:translate-x-[21px]'
            case 'lg': return 'data-[state=checked]:translate-x-[30px]'
            case 'xl': return 'data-[state=checked]:translate-x-[35px]'
          }
        })()

      )}>
        {showSymbols&&(
          <>
            <X strokeWidth={'3px'} className={`hidden group-data-[state=unchecked]:block ${theme==='light'?'text-red-500':'text-red-400'}`}/>
            <Check strokeWidth={'3px'} className={`hidden group-data-[state=checked]:block ${theme==='light'?'text-green-500':'text-green-400'}`}/>
          </>
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
