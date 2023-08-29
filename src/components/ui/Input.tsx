import {forwardRef, InputHTMLAttributes, ChangeEvent} from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
    // eslint-disable-next-line no-unused-vars
    onChange:(e: ChangeEvent<HTMLInputElement>) => void
  }

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        autoComplete="new-password"
        type={type||'text'}
        spellCheck="false" 
        className={cn(
          "flex h-10 w-full rounded-sm border border-border bg-transparent px-3 py-2 text-inherit ring-offset-background file:border-0 file:bg-transparent file:text-inherit file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }