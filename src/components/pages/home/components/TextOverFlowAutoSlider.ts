import { checkOverflow, overflowDifferenceX } from "@/lib/utils";
import { RefObject } from "react";

interface Props {
  wrapperRef: RefObject<HTMLElement>,
  overflowsCallback?: () => void
}

interface States {
  flag: boolean,
  wrapper: HTMLElement | null
  twin: HTMLParagraphElement | null
  intervalId: NodeJS.Timer | null
  overflowDifferenceX: number
  forward: boolean
}

const defaultStateValues: States = { 
  flag: false, 
  forward: true ,
  intervalId: null, 
  twin: null,
  overflowDifferenceX: 0, 
  wrapper: null,
}

const defaultCallback = () => {}

export const TextOverFlowAutoSlider = ({wrapperRef, overflowsCallback=defaultCallback}: Props) => {

  const states: States = {...defaultStateValues }

  const transformTwin = () => {
    const {twin} = states
    if(twin === null) return
    if(!states.wrapper) return
    states.forward = !states.forward
    twin.style.transform = `translate(-${states.forward ? states.overflowDifferenceX+5:0}px, 0px)`
  }

  const showOriginalChild = () => {
    if(!states.wrapper) return null
    const originalChild = states.wrapper.firstElementChild as HTMLParagraphElement
    if(!originalChild) return null
    originalChild.style.opacity = '1'
  }

  const removeAllChildrenExceptFirstChild = () => {

    if(!states.wrapper) return

    while (states.wrapper.childNodes.length > 1) {
      states.wrapper.lastChild&&states.wrapper.removeChild(states.wrapper.lastChild);
    }
  
  }
  
  const createTwin = () => {

    if(!states.wrapper) return null
  
    const originalChild = states.wrapper.firstElementChild as HTMLParagraphElement
    if(!originalChild) return null
  
    const text = originalChild.textContent
    const twinWrapper = document.createElement('div')
    twinWrapper.style.position = 'absolute' 
    twinWrapper.style.zIndex = '2' 
    twinWrapper.style.paddingRight = '8px'
    twinWrapper.style.width = '100%'
    twinWrapper.style.height = 'fit-content'
    twinWrapper.style.whiteSpace = 'nowrap'
    twinWrapper.style.transitionProperty = 'transform'
    twinWrapper.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'
    twinWrapper.style.transitionDuration = '1000ms'
  
    const twinParagraph = document.createElement('p')
    twinParagraph.style.flexGrow = '1'
    twinParagraph.textContent = text
    
    twinWrapper.appendChild(twinParagraph)
    states.wrapper.appendChild(twinWrapper)
  
    return twinWrapper
  }
  
  const hideOriginalChild = () => {

    if(!states.wrapper) return

    const originalChild = states.wrapper.firstElementChild as HTMLParagraphElement
    if(!originalChild) return null
    originalChild.style.opacity = '0'
  }
  
  const fixTextDisplay = ()=>{
    if(!wrapperRef.current) return

    states.wrapper = wrapperRef.current

    states.intervalId&&clearInterval(states.intervalId);
    if(checkOverflow(states.wrapper)){

      overflowsCallback()

      hideOriginalChild()
      removeAllChildrenExceptFirstChild()
      states.twin = createTwin()

      states.flag = true
      states.forward = false
      states.overflowDifferenceX = overflowDifferenceX(states.wrapper)
      states.intervalId = setInterval(()=>{ transformTwin() }, 2000)

    }else{

      const {flag, forward, intervalId, overflowDifferenceX} = defaultStateValues
      states.flag = flag
      states.forward = forward
      states.intervalId = intervalId
      states.overflowDifferenceX = overflowDifferenceX
      removeAllChildrenExceptFirstChild()
      showOriginalChild()

    }
  }

  fixTextDisplay()
  window.addEventListener('resize', fixTextDisplay)

  return () => {
    window.removeEventListener('resize', fixTextDisplay)
    states.intervalId&&clearInterval(states.intervalId);
  }
}

