
interface Props {
  children: React.ReactNode;
  className?: string;
  showCover: boolean;
}

export default function TextCover ({
  children,
  className='',
  showCover=false
}:Props) {

  return (
    <div className={className}>
      {showCover&&<div className="absolute inset-0 bg-black/70 z-1"/>}
      {children}
    </div>
  )
}