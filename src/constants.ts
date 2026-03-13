export interface Game {
  id: string;
  title: string;
  price: number;
  platform: 'PS5' | 'XBOX' | 'PC';
  image: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'GTA V: Expanded & Enhanced',
    price: 199.90,
    platform: 'PS5',
    image: 'https://picsum.photos/seed/gtav/600/800',
    category: 'Ação'
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    price: 149.90,
    platform: 'XBOX',
    image: 'https://picsum.photos/seed/rdr2/600/800',
    category: 'Aventura'
  },
  {
    id: '3',
    title: 'Cyberpunk 2077',
    price: 129.90,
    platform: 'PC',
    image: 'https://picsum.photos/seed/cp2077/600/800',
    category: 'RPG'
  },
  {
    id: '4',
    title: 'Elden Ring',
    price: 249.90,
    platform: 'PS5',
    image: 'https://picsum.photos/seed/elden/600/800',
    category: 'Souls-like'
  },
  {
    id: '5',
    title: 'Spider-Man 2',
    price: 299.90,
    platform: 'PS5',
    image: 'https://picsum.photos/seed/spiderman/600/800',
    category: 'Herói'
  },
  {
    id: '6',
    title: 'Forza Horizon 5',
    price: 179.90,
    platform: 'XBOX',
    image: 'https://picsum.photos/seed/forza/600/800',
    category: 'Corrida'
  },
  {
    id: '7',
    title: 'The Last of Us Part II',
    price: 199.90,
    platform: 'PS5',
    image: 'https://picsum.photos/seed/tlou2/600/800',
    category: 'Aventura'
  },
  {
    id: '8',
    title: 'Starfield',
    price: 229.90,
    platform: 'XBOX',
    image: 'https://picsum.photos/seed/starfield/600/800',
    category: 'RPG'
  },
  {
    id: '9',
    title: 'God of War Ragnarök',
    price: 279.90,
    platform: 'PS5',
    image: 'https://picsum.photos/seed/gowr/600/800',
    category: 'Ação'
  }
];

export const GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://picsum.photos/seed/gta1/1200/800', title: 'Pôr do sol em Los Santos' },
  { id: 'g2', url: 'https://picsum.photos/seed/gta2/1200/800', title: 'Perseguição em Alta Velocidade' },
  { id: 'g3', url: 'https://picsum.photos/seed/gta3/1200/800', title: 'Centro de Vinewood' },
  { id: 'g4', url: 'https://picsum.photos/seed/gta4/1200/800', title: 'Noite em Vespucci Beach' },
  { id: 'g5', url: 'https://picsum.photos/seed/gta5/1200/800', title: 'Monte Chiliad' },
  { id: 'g6', url: 'https://picsum.photos/seed/gta6/1200/800', title: 'Garagem de Luxo' },
];
