import { RefObject, useCallback, useEffect } from 'react';
import useSwipe from './use-swipe';

interface ScrollStates {
  flagPause: boolean,
  sectionIndex: number,
  sections: HTMLElement[],
  scrollableDiv: HTMLDivElement
}

const scrollStates: ScrollStates = {
  flagPause: false,
  sectionIndex: 0,
  sections: [],
  scrollableDiv: null!
}

const SCROLL_TIMEOUT_DURATION = 600

const flickScroll = (e: any) => {


  const {flagPause, scrollableDiv} = scrollStates

  if(scrollableDiv.getAttribute('data-enable-flick-scrolling') === 'false'){
    return
  } 


  //disable default scroll behavior
  if (e.cancelable) {
    e.preventDefault();
    e.stopPropagation();
    
    if(e.type === "touchmove"){
      return
    }

    // prevents spam and redundancy on mobile swipe and default scroll
    if( !flagPause ){
      const deltaDirection = (e.wheelDeltaY > 0) ? 'up' : 'down'

      scrollStates.flagPause = true
      setTimeout(() => {
        scrollStates.flagPause = false;
      }, SCROLL_TIMEOUT_DURATION);
      turnToPage(deltaDirection)
    }

    return 
  }
  
}

const turnToPage = (direction: 'up' | 'down') => {

  const {scrollableDiv, sections} = scrollStates

  if(scrollableDiv.getAttribute('data-enable-flick-scrolling') === 'false'){
    return
  } 

  const { scrollY, innerHeight } = window

  let currentIndex = -1
  for (let i = 0; i < sections.length; i++) {
    const { offsetTop: sectionTop, offsetHeight: sectionHeight } = sections[i];

    const sectionBottom = sectionTop + sectionHeight;
    const windowView = scrollY + (innerHeight/2)
    
    if(windowView >= sectionTop && windowView <= sectionBottom){
      currentIndex = i
      break;
    }
  }

  let newTargetIndex = currentIndex

  if(direction==='up' && currentIndex > 0){ newTargetIndex-- }

  if(direction==='down' && currentIndex < scrollableDiv.children.length-1){ newTargetIndex++ }
  
  const targetElement = scrollableDiv.children[newTargetIndex] as HTMLElement

  window.scrollTo(0, targetElement.offsetTop);
}

const pageUp = () => {
  scrollStates.flagPause = true
  setTimeout(() => {
    scrollStates.flagPause = false;
  }, SCROLL_TIMEOUT_DURATION);
  turnToPage('up');
};

const pageDown = () => {
scrollStates.flagPause = true
  setTimeout(() => {
    scrollStates.flagPause = false;
  }, SCROLL_TIMEOUT_DURATION);
  turnToPage('down');
};


const useFlickScroll = (ref:RefObject<HTMLElement>) => {

  // reversed cus swiping
  const swipeListener = useSwipe({
    onUp: pageDown,
    onDown: pageUp,
    threshold: 0.5,
  })

  const bind = () => ({ ...swipeListener() })
  
  const disableFlickScrolling = useCallback(() => {
    ref.current?.removeEventListener('wheel', flickScroll);
    ref.current?.removeEventListener('touchmove', flickScroll, true);
  },[ref])

  useEffect(()=>{
    if(!ref.current) return

    const scrollableDiv = ref.current as HTMLDivElement

    scrollStates.scrollableDiv = scrollableDiv
    scrollStates.sections = Array.from(scrollableDiv.children) as HTMLElement[]
    
    scrollableDiv.addEventListener('wheel', flickScroll);
    scrollableDiv.addEventListener('touchmove', flickScroll, false);

    return () => { disableFlickScrolling() }

  },[ ref, disableFlickScrolling ])

  return { bind }
}



export default useFlickScroll