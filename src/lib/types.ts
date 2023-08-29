
type LinkMark = 'Right' | 'Left' | 'Top' | 'Top-Right' | 'Top-Left' | 'Bottom' | 'Bottom-Right' | 'Bottom-Left'

export interface YGOCard{
  id:number,
  name:string,
  desc:string,
  type:string,
  atk?:number,
  def?:number,
  level?:number,
  race?:string,
  attribute?:string,
  linkval?:number,
  linkmarkers?:LinkMark[],
  scale?:number,
  card_images:CardImage[],
  card_prices?:CardPrice[],
  card_sets?:CardSets[],
  banlist_info?:BanlistInfo
  previousIndex?:number,
}

export interface CardImage{
  id:number,
  image_url?:string,
  image_url_small?:string,
  image_url_cropped?:string
}

export interface CardPrice{
  amazon_price:string,
  cardmarket_price:string,
  coolstuffinc_price:string,
  ebay_price:string,
  tcgplayer_price:string
}

export interface CardSets{
  set_code:string,
  set_name:string,
  set_price:string,
  set_rarity:string,
  set_rarity_code:string
}

export interface BanlistInfo{
  ban_goat?: 'Banned' | 'Limited' | 'Semi-Limited',
  ban_ocg: 'Banned' | 'Limited' | 'Semi-Limited',
  ban_tcg: 'Banned' | 'Limited' | 'Semi-Limited',
}

export type YGOCardGame = 'T.C.G.' | 'O.C.G.'

export interface Query {
  name:string,
  desc:string,
  keywords:string,
  type:string,
  subtype:string,
  race:string,
  attribute:string,
  atk:{min:number,max:number}
  def:{min:number,max:number}
  level:{min:number,max:number},
  limit: number
  cardGame: YGOCardGame
}

export interface CardTypes{
 
  primaryTypes:string[],
  races:string[],
  monsterTypes:string[],
  spellTypes:string[],
  trapTypes:string[],
  attributes:string[],
  levels:number[]

}

export interface NotifType{
  id:string,
  deck:string,
  action:string,
  message:string,
  card:YGOCard|null,
  timer:NodeJS.Timeout
}