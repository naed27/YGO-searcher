import Link from 'next/link';


export default function HomeButton() {

  return (
    <div className="w-full flex flex-wrap justify-center items-center mt-2">
      <Link 
      href={'/'}
      replace
      className="w-full h-full min-height-[30px] bg-accent hover:bg-accent-hover border border-border p-2 flex justify-center items-center gap-1 cursor-default flex-grow basis-[30px]">
        <p>Close</p>
      </Link>
    </div>
  )
}