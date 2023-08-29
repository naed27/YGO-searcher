import { useCallback, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

interface Props{
  children: React.ReactNode;
  className?: string;
  onClickOutside?:() => any
}

export default function Modal ({
  children,
  className='',
  onClickOutside = () => {},
}:Props) {

  const modalRef = useRef<HTMLDivElement>(null);
  const onClickHandler = useCallback(onClickOutside,[onClickOutside])

  useOnClickOutside(modalRef, onClickHandler);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-[2]">
      <div className={className} ref={modalRef}>
        {children}
      </div>
    </div>
  )
}