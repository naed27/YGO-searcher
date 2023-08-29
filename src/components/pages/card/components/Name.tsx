
export default function Name({cardName}:{cardName: string}){

  return (
    <div className="relative w-full h-[60px] text-sm min-[500px]:text-base text-center px-4 flex justify-center items-center">
      <p>
        {cardName}
      </p>
    </div>
  )
}

