export interface MenuItem  {
  index: number;
  name: 'Tap or swipe the portfolio!' 
  | 'YGO Card Searcher' 
  | 'Country Informer' 
  | 'Audio Visualizer' 
  | 'Phantasmora' 
  | 'Whiteside'
  | 'Contacts';
  link: string;
  imgSrc: string;
  description: string;
}

const projects: MenuItem[] = 
[
  {
    index: -1, 
    name: 'Tap or swipe the portfolio!', 
    link:'/', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1114435135077617785/image.png',
    description: '',
    },
  {
    index: 0, 
    name: 'YGO Card Searcher', 
    link:'https://portfolio-dean27.vercel.app/projects/card-searcher', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1144549861652435046/blueeyes.jpg',
    description: 'Browse and access every card in Yu-Gi-Oh!',
  },
  {
    index: 1, 
    name: 'Country Informer', 
    link:'https://portfolio-dean27.vercel.app/projects/country-informer', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1143801598112448562/map2.jpg',
    description: 'Discover information on any nation in seconds!',
  },
  {
    index: 2, 
    name: 'Audio Visualizer', 
    link:'https://portfolio-dean27.vercel.app/projects/audio-visualizer', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1143802578363236433/visual2.jpg',
    description: 'Watch as sounds come to life!',
  },
  {
    index: 3, 
    name: 'Phantasmora', 
    link:'https://portfolio-dean27.vercel.app/games/phantasmora', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112760858163028091/image.png',
    description: 'A thrilling game about a ghost trapped in a dungeon!',
  },
  {
    index: 4, 
    name: 'Whiteside', 
    link:'https://whiteside.vercel.app/', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1143805404208435241/Tren_Shoes_6.jpg',
    description: 'An online clothing store!',
  }
]

export default projects