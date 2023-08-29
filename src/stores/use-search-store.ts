/* eslint-disable no-unused-vars */

import { 
  isEmpty, 
  isNegative, 
  areExactlySame, 
  containsKeyword, 
  isGreaterAndEqual,
  isLesserAndEqual,
  containsKeywords,
  hasSameLetters,
  parseLimit, } from '@/lib/utils';

import { CardTypes, Query, YGOCard, YGOCardGame } from '@/lib/types';
import { create } from 'zustand'

export type Searcher = (input: InputQuery) => void;
export type Queuer = (input: InputQuery) => void

export interface InputQuery{
  name?:string,
  desc?:string,
  keywords?:string,
  type?:string,
  subtype?:string,
  race?:string,
  attribute?:string,
  atk?:{min:number,max:number},
  def?:{min:number,max:number},
  level?:{min:number,max:number},
  limit?:number,
  cardGame?:YGOCardGame,
}

export const initialQuery: Query = {
  name:'',
  desc:'',
  keywords:'',
  type:'',
  subtype:'',
  race:'',
  attribute:'',
  atk:{ min:-1, max:-1 },
  def:{ min:-1, max:-1 },
  level:{ min:-1, max:-1 },
  limit: -1,
  cardGame:'T.C.G.',
}

interface SearchStoreStates{
  query: Query,
  cards: YGOCard[],
  searchedCards: YGOCard[],
  pageNumber: number,
  selectedCard: YGOCard | null
  maxPageOfTable: number,
  tablePageRange: number,
  searchIndex: number | null,
  showFilters: boolean,
  cardTypes: CardTypes,
  typingTimeout: NodeJS.Timeout|null
  isFetchingCards: boolean,
  noNetwork: boolean,

  setNoNetwork: (input: boolean)=>void,
  setIsFetchingCards: (input: boolean)=>void,
  setQuery: (input: Query) => void
  setCards: (input: YGOCard[]) => void
  setSearchedCards: (input: YGOCard[]) => void
  setSelectedCard: (input: YGOCard | null) => void
  setMaxPageOfTable: (input: number) => void
  setTablePageRange: (input: number) => void
  setSearchIndex: (input: number) => void
  setShowFilters: (input: boolean) => void
  setCardTypes: (input: CardTypes) => void
  setTypingTimeout: (input:NodeJS.Timeout) => void

  setPageNumber: (input: number) => void
  upPageNumber: ()=>void
  downPageNumber: ()=>void

  queueQuery: Queuer
  search: (input: InputQuery) => void

  resetAllStates: () => void
}

export const useSearchStore = create<SearchStoreStates>()((set) => ({
  query: initialQuery,
  cards: [],
  pageNumber: 1,
  searchedCards: [],
  searchIndex: null,
  selectedCard: null,
  showFilters: false,
  maxPageOfTable: 0,
  tablePageRange: 10,
  cardTypes: null!,
  typingTimeout: null,
  isFetchingCards: true,
  noNetwork: false,


  setNoNetwork: (input) => set((current) => ({ ...current, noNetwork: input })), 
  setIsFetchingCards: (input) => set((current) => ({ ...current, isFetchingCards: input })), 
  
  queueQuery: (input) => set((current)=>{

    const { typingTimeout, search, query } = current

    if(typingTimeout)clearTimeout(typingTimeout)

    return ({ 
      ...current, 
      query: {...query, ...input},
      typingTimeout: setTimeout(() => search(input), 100),
    })

  }),

  search: (newInput) => set((current) => {

    const {query, cards} = current
    const oldInput = query
    const input: Query = {...oldInput,...newInput};    // overwrite old input with new input
    const {type:previousType} = oldInput;               // get previous type
    const {type:updatedType} = input;                    // get updated type 
  
    if(updatedType!==previousType){                      // reset sub-types if main type changes
      
      const defaultRange = { min:-1,max:-1 };
      const defaultString = '';
  
      input.race = defaultString
      input.subtype = defaultString
      input.attribute = defaultString
      
      input.atk = { ...defaultRange }
      input.def = { ...defaultRange }
      input.level = { ...defaultRange }
  
    }
  
    let result:YGOCard[] = [...cards];
    
    !isNegative( input.limit ) && (result = filterByLimit ( input.limit, input.cardGame, result ))
    !isEmpty( input.name ) && (result = filterByName ( input.name, result ))
    !isEmpty( input.desc ) && (result = filterByDesc ( input.desc, result ))
    !isEmpty( input.keywords ) && (result = filterByKeywords ( input.keywords, result ))
    !isEmpty( input.type ) && (result = filterByType ( input.type, result ))
  
    if(input.type==='Monster'){
  
      !isNegative( input.level.min ) && (result = filterByMinLv ( input.level.min, result ));
      !isNegative( input.level.max ) && (result = filterByMaxLv ( input.level.max, result ));
  
      !isNegative( input.atk.min ) && (result = filterByMinAtk ( input.atk.min, result ));
      !isNegative( input.atk.max ) && (result = filterByMaxAtk ( input.atk.max, result ));
  
      !isNegative( input.def.min ) && (result = filterByMinDef ( input.def.min, result ));
      !isNegative( input.def.max ) && (result = filterByMaxDef ( input.def.max, result ));
  
      !isEmpty( input.race ) && (result = filterByRace ( input.race, result ))
      !isEmpty( input.subtype ) && (result = filterByMonsterSubType ( input.subtype, result ))
      !isEmpty( input.attribute ) && (result = filterByAttr ( input.attribute, result ))
  
    }else if(input.type==='Spell'||input.type==='Trap'){
  
      !isEmpty( input.subtype ) && (result = filterByNonMonsterSubType ( input.subtype, result ))
  
    }
    
    return ({ 
      ...current, 
      query: input ,
      searchedCards: result,
      pageNumber: ( result.length === 0 ) ? 0 : 1
    })
  }),


  setQuery: (input) => set((current) => ({ ...current, query: input })),
  setCards: (input) => set((current) => ({ ...current, cards: input })),
  setPageNumber: (input) => set((current) => ({ ...current, pageNumber: input })),
  setSearchIndex: (input) => set((current) => ({ ...current, searchIndex: input })),
  setShowFilters: (input) => set((current) => ({ ...current, showFilters: input })),
  setSelectedCard: (input) => set((current) => ({ ...current, selectedCard: input })),
  setSearchedCards: (input) => set((current) => ({ ...current, searchedCards: input })),
  setMaxPageOfTable: (input) => set((current) => ({ ...current, maxPageOfTable: input })),
  setTablePageRange: (input) => set((current) => ({ ...current, tablePageRange: input })),
  setCardTypes: (input) => set((current) => ({ ...current, cardTypes: input })),
  setTypingTimeout: (input) => set((current) => ({ ...current, typingTimeout: input })),

  upPageNumber: () => set((current) => {
    const currentPage = current.pageNumber
    const maxPage = current.maxPageOfTable
    if(currentPage >= maxPage)return current
    return ({ ...current, pageNumber: currentPage+1 })
  }),
  
  downPageNumber: () => set((current) => {
    const currentPage = current.pageNumber
    if(currentPage <= 1) return current
    return ({ ...current, pageNumber: currentPage-1 })
  }),

  resetAllStates: () =>  set((current) => ({ ...current, input: ''})),
 }));

 const filterByName = (name: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.name, name ))
 const filterByDesc = (desc: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.desc, desc ))
 const filterByKeywords = (keywords: string, result:YGOCard[]) => result.filter( c => containsKeywords( c.name, keywords ) || containsKeywords( c.desc, keywords ) )
 const filterByType = (type: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.type, type ))
 const filterByMinLv = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.level, min))
 const filterByMaxLv = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.level, max))
 const filterByMinAtk = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.atk, min))
 const filterByMaxAtk = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.atk, max))
 const filterByMinDef = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.def, min))
 const filterByMaxDef = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.def, max))
 const filterByRace = (race: string, result:YGOCard[]) => result.filter( c => areExactlySame( c.race, race ))
 const filterByAttr = (attr: string, result:YGOCard[]) => result.filter( c => areExactlySame( c.attribute, attr ))
 const filterByMonsterSubType = (subType: string, result:YGOCard[]) => result.filter( c => hasSameLetters( c.type.split(' ')[0], subType ))
 const filterByNonMonsterSubType = (subType: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.race, subType))
 const filterByLimit = (limit: number, cardGame:YGOCardGame, result:YGOCard[]) => result.filter( c => {
   const {banlist_info} = c;
   return limit === parseLimit(cardGame, banlist_info);
 })
 
 

 