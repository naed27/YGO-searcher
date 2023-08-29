"use client"

import { Loader } from "lucide-react"

const LoadingPage = () => {
  return (
    <div className='group/loader fixed inset-0 flex flex-col justify-center items-center pb-5'>
      <Loader className="animate-spin"/>
    </div>
  )
}

export default LoadingPage