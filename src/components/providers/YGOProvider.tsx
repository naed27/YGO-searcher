"use client"

import useLoadApp from "@/hooks/use-load-app"
import useOnPopState from "@/hooks/use-on-popstate"


const YGOProvider = () => {

  useLoadApp()
  useOnPopState()

  return null
}

export default YGOProvider