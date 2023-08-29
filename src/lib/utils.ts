import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import { toast } from '@/hooks/use-toast';
import { getFromElementCache, setInElementCache } from './cache';

import {BanlistInfo, YGOCard, YGOCardGame} from './types';
import axios from 'axios';

export interface Coordinates {
  x: number,
  y: number
}

export const smoothScrollTowardsElement = (elementId: string) => {
  const cachedElement = getFromElementCache(elementId)
  const element = cachedElement || document.getElementById(elementId) as HTMLElement

  if (!element) return;

  if(!cachedElement)
    setInElementCache(elementId, element)

  window.scrollTo(0, element.offsetTop);
};

export const isOnMobile = () => {
  return (window.innerWidth < window.innerHeight || window.innerHeight < 400)
}

export const subtractCoordinates = (a:Coordinates, b:Coordinates) => {
  const dx = a.x - b.x
  const dy = a.y - b.y

  return {x:dx, y:dy}
}

export const addCoordinates = (a:Coordinates, b:Coordinates) => {
  const sx = a.x + b.x
  const sy = a.y + b.y

  return {x:sx, y:sy}
}

export const randomNumberBetween = ({min=0, max}: {min?: number, max: number}) => {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

export const delay = async (milliseconds:number) => new Promise(res=>setTimeout(res, milliseconds))

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertEpochToLocalTime = (
  epoch: number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
) => {
  const localTime = new Date(epoch * 1000);
  
  return localTime.toLocaleString(undefined, options);
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const stringToArray = <T>(input: string): T[] => {
  try {
    const array = JSON.parse(input);
    if (Array.isArray(array)) {
      return array;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};



export const toastError = (title: string, description: string) => {
  toast({title, description, variant: 'destructive'});
};

export const toastDefault = (title: string, description: string) => {
  return toast({title, description, variant: 'default'});
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}



export const isEmpty = (str: string) => {
    return !str || 0 === str.length;
}

export const sortStrings = (a:string,b:string)=>{
  if(a.toLowerCase()>b.toLowerCase()) return 1;
  if(a.toLowerCase()<b.toLowerCase()) return -1;
  return 0;
}

export const sortNumbers = (a:number,b:number)=>{
  return a-b;
} 

export const isString = (str:any)=>{
  return typeof str === 'string' || str instanceof String;
}

export const isNegative = (input:number|undefined)=>{
  return input!==undefined && input<0;
}

export const isGreaterAndEqual = (input:number|undefined,limit:number)=>{
  return input!==undefined && input>=limit;
}

export const isLesserAndEqual = (input:number|undefined,limit:number)=>{
  return input!==undefined && input<=limit;
}

export const isWithinRange = (input:number|undefined,range:{min:number,max:number})=>{
  if(input===undefined) return false;
  if(input>=range.min && input<=range.max) return true;
  return false;
}

export function checkOverflow(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export function overflowDifferenceX(element: HTMLElement) {
  return element.scrollWidth - element.clientWidth;
}

export function overflowDifferenceY(element: HTMLElement) {
  return element.scrollHeight - element.clientHeight;
}

export const capitalizeProperly = (str:string|number|undefined) =>{
  if(str === null) return 'null'
  if(str === undefined) return 'undefined'
  const string  = str.toString().toLowerCase();
  const initials = string.split('.').slice(0,-1)
  if(initials.length>1){
    const allAreInitials = initials.every(initial=>initial.length === 1);
    if(allAreInitials) return initials.join('').toUpperCase();
  }
  
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export const renewTimer = (callback:()=>void,timerId:NodeJS.Timeout, newTime:number)=>{
  clearTimeout(timerId);
  return setTimeout(callback,newTime);
}

export const parseLimit = ( cardGame:YGOCardGame, banlistInfo?:BanlistInfo,) =>{
  if(banlistInfo===undefined) return 3
  const {ban_ocg, ban_tcg} = banlistInfo;
  if(cardGame==='O.C.G.'){
    if(ban_ocg==='Banned') return 0
    if(ban_ocg==='Limited') return 1
    if(ban_ocg==='Semi-Limited') return 2
  }
  if(ban_tcg==='Banned') return 0
  if(ban_tcg==='Limited') return 1
  if(ban_tcg==='Semi-Limited') return 3
  return 3
}

export const getCardCategory = (card:YGOCard)=>{
  if(
    containsKeyword(card.type,'xyz')||
    containsKeyword(card.type,'fusion')||
    containsKeyword(card.type,'synchro')||
    containsKeyword(card.type,'link')
  )return 'extra';
  return 'main'
}

export const purify = (word:string)=>{
  return word.toLowerCase().replace(/\s+/g, '');
}

export const containsKeyword = (main_word:string|undefined,key_word:string) =>{
  if(main_word===undefined)return false;
  if(purify(main_word).includes(purify(key_word)))return true;
  return false;

}

export const containsKeywords = (main_word:string|undefined,key_words:string) =>{
  if(main_word===undefined)return false;
  const mainword = main_word.toLowerCase();
  const keywords = key_words.toLowerCase().split(/[\s,]+/);
  const tracker = keywords.map((keyword)=>({
    keyword:keyword,
    i:0,
    isFound:false
  }))

  for (let i = 0; i < mainword.length; i++) {
    const letter = mainword[i];
    tracker.map((t)=>{
      if(t.isFound)return
      if(letter===t.keyword[t.i])t.i++
      else t.i=0;
      if(t.i===t.keyword.length)t.isFound=true;
    })
  }

  const foundCount = tracker.filter(({isFound})=>isFound).length;
  if(foundCount===keywords.length)return true
  else return false;

}

export const containsInitials = (words:string,keyInitials:string) =>{
  const word_initials = words.toLowerCase().split(' ').map((word)=>word.charAt(0)).join('');
  const initials = keyInitials.toLowerCase();
  if(word_initials.includes(initials))return true;
  return false;
}

export const pushIfUnique = (array: any[], element: any) => 
  !array.includes(element) && array.push(element)

export const removeBlanksFromArray = <T>(array: T[]): T[] => 
  array.filter(item=>item!=null||item!=undefined)

export const findWord = (arrayOfWords:string[],keyword:string)=>{
  let filtered = [];
  let startWiths = arrayOfWords.filter(mainWord=>mainWord.toLowerCase().startsWith(keyword.toLowerCase()));
  let keysFound = arrayOfWords.filter(mainWord=>containsKeyword(mainWord,keyword));
  let initialsFound = arrayOfWords.filter(mainWord=>containsInitials(mainWord,keyword));
  
  if(startWiths.length>1){
      filtered.push(...startWiths);
      return filtered;
  }else{
    if(keysFound.length>1){
      filtered.push(...keysFound)
      return filtered;
    }else{
      if(initialsFound.length>1){
        filtered.push(...initialsFound)
        return filtered;
      }
    }
  }
  return false;
}

export const filterDuplicates = (array:any[])=>{
  const result:any[] = [];
  array.forEach((element)=>{
    if(!result.includes(element)){
      result.push(element);
    }
  })
  return result;
}

export const areExactlySame = (word1:string|undefined,word2:string|undefined)=>{
  if(word1===undefined || word2===undefined)return false;
  if(word1===word2)return true
  return false;
}

export const hasSameLetters = (word1:string|undefined,word2:string|undefined) => {
  if(word1===undefined || word2===undefined)return false;
  if(word1.toLowerCase()===word2.toLowerCase())return true
  return false;
}

export function preloadImages(imageUrls: string[]) {
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const image = new Image();
    image.src = url;
  }
}
// ------------ table scaling based on screen

export const getMaxPageCount = ({displayCount, totalItemCount}: {displayCount: number, totalItemCount: number}) => {
  if(totalItemCount === 0) return 0
  if(totalItemCount < displayCount) return 1

  if(totalItemCount % displayCount === 0) 
    return totalItemCount / displayCount
  return Math.floor(totalItemCount / displayCount) + 1;
}

export const getTotalPaddingX = (element: HTMLElement) => {
  const elementCSS = window.getComputedStyle(element)

  const left = parseFloat(elementCSS.paddingTop || '0')
  const right = parseFloat(elementCSS.paddingTop || '0')

  return left+right;
}


export const getTotalPaddingY = (element: HTMLElement) => {
  const elementCSS = window.getComputedStyle(element)
  
  const top = parseFloat(elementCSS.paddingTop || '0')
  const bottom = parseFloat(elementCSS.paddingTop || '0')

  return top+bottom;
}

interface GetCardsPerRowProps {
  container: HTMLElement,
  cardWidth: number,
  flexGap: number,
}

export const getItemsPerRow = ({ container, cardWidth, flexGap }: GetCardsPerRowProps) =>{
  const allowableWidth = container.offsetWidth - getTotalPaddingX(container)
  if(allowableWidth<cardWidth) return 1
  const cardsPerRow = Math.floor(allowableWidth/cardWidth)
  const gapped = (cardWidth*cardsPerRow) + (flexGap*(cardsPerRow-1))
  if (gapped<=allowableWidth)
    return cardsPerRow
  return cardsPerRow-1
}

interface GetCardsPerColumnProps {
  container: HTMLElement,
  cardHeight: number,
  flexGap: number,
}

export const getItemsPerColumn = ({ container, cardHeight, flexGap }: GetCardsPerColumnProps) =>{
  const allowableHeight = container.offsetHeight - getTotalPaddingY(container)
  if(allowableHeight<cardHeight) return 1
  const cardsPerColumn = Math.floor(allowableHeight/cardHeight)
  const gapped = (cardHeight*cardsPerColumn) + (flexGap*(cardsPerColumn-1))
  if (gapped<=allowableHeight)
    return cardsPerColumn
  return cardsPerColumn-1
}

// ----------- api caching

export const cacheApiData = async (endpoint: string) => {
  const db = await openDatabase();
  const cachedData = await getDataFromObjectStore(db, 'cache', endpoint);

  if (cachedData) {
    return Promise.resolve({ data: cachedData, success: true });
  }

  const result = await axios.get(endpoint).catch(() => {
    console.log('fetch failed');
  });

  if (!result) return { data: null, success: false };

  await putDataInObjectStore(db, 'cache', result.data, endpoint);

  return { data: result.data, success: true };
};

const openDatabase = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('cache');
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
    request.onupgradeneeded = () => {
      request.result.createObjectStore('cache', { keyPath: 'endpoint' })
    };
  });
};

const getDataFromObjectStore = async (db: IDBDatabase, name: string, key: string) => {
  return new Promise<any>((resolve, reject) => {
    const transaction = db.transaction(name, 'readonly');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.get(key);
    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    }
    request.onerror = () => {
      reject(request.error);
    }
  });
};

const putDataInObjectStore = async (db: IDBDatabase, name: string, data: any, key: string) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(name, 'readwrite');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.put({ endpoint: key, data: data });
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// ----------------- 


export const fetchCardTypes = (mainCards:YGOCard[])=>{
  
  const primaryTypes = ['Monster','Spell','Trap'];
  const races:string[] = [];
  const monsterTypes:string[] = [];
  const spellTypes:string[] = [];
  const trapTypes:string[] = [];
  const attributes:string[] = [];
  const levels:number[] = [];

  mainCards.map((card)=>{
    const {type,race,attribute,level} = card;
    if(race===undefined)return
    if(containsKeyword(type,'Spell')) return pushIfUnique(spellTypes,race)
    if(containsKeyword(type,'Trap')) return pushIfUnique(trapTypes,race)
    if(containsKeyword(type,'Monster')) {
      if(attribute===undefined)return
      pushIfUnique(monsterTypes,type.split(' ')[0])
      pushIfUnique(attributes,attribute)
      pushIfUnique(races,race)
      pushIfUnique(levels,level)
      return
    }
    return
  });

  return {
    primaryTypes:removeBlanksFromArray(primaryTypes).sort(sortStrings),
    races:removeBlanksFromArray(races).sort(sortStrings),
    monsterTypes:removeBlanksFromArray(monsterTypes).sort(sortStrings),
    spellTypes:removeBlanksFromArray(spellTypes).sort(sortStrings),
    trapTypes:removeBlanksFromArray(trapTypes).sort(sortStrings),
    attributes:removeBlanksFromArray(attributes).sort(sortStrings),
    levels:removeBlanksFromArray(levels).sort(sortNumbers),
  }
}