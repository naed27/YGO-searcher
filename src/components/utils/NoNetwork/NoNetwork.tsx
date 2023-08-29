"use client"


const message = `Oops! It seems like there's a problem with the network connection. Please check your internet connection and try again later.`

const NoNetwork = () => {
  return (
    <div className='group/loader fixed inset-0 text-center flex flex-col justify-center items-center p-5 min-[350px]:p-10 text-xs min-[400px]:text-sm min-[600px]:text-base'>
      <p className="w-full max-w-[500px]">
        {message}
      </p>
    </div>
  )
}

export default NoNetwork