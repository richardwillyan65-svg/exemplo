export interface Game {
  id: string;
  title: string;
  platform: string[];
  genre: string;
  price: number;
  image: string;
  rating: number;
}

export const GAMES: Game[] = [
  // PC
  {
    id: '1',
    title: 'Cyberpunk 2077',
    platform: ['PC', 'PS5', 'Xbox Series X'],
    genre: 'RPG',
    price: 199.90,
    image: 'https://picsum.photos/seed/cyberpunk/400/500',
    rating: 4.5
  },
  {
    id: '2',
    title: 'Elden Ring',
    platform: ['PC', 'PS5', 'Xbox Series X', 'PS4', 'Xbox One'],
    genre: 'Action RPG',
    price: 249.90,
    image: 'https://picsum.photos/seed/eldenring/400/500',
    rating: 4.9
  },
  {
    id: '3',
    title: 'The Witcher 3: Wild Hunt',
    platform: ['PC', 'PS5', 'Xbox Series X', 'Switch'],
    genre: 'RPG',
    price: 99.90,
    image: 'https://picsum.photos/seed/witcher3/400/500',
    rating: 4.8
  },
  // PlayStation
  {
    id: '4',
    title: 'God of War Ragnarök',
    platform: ['PS5', 'PS4'],
    genre: 'Action-Adventure',
    price: 299.90,
    image: 'https://picsum.photos/seed/gowr/400/500',
    rating: 4.9
  },
  {
    id: '5',
    title: 'Horizon Forbidden West',
    platform: ['PS5', 'PS4'],
    genre: 'Action RPG',
    price: 199.90,
    image: 'https://picsum.photos/seed/horizon/400/500',
    rating: 4.7
  },
  {
    id: '6',
    title: 'Spider-Man 2',
    platform: ['PS5'],
    genre: 'Action-Adventure',
    price: 349.90,
    image: 'https://picsum.photos/seed/spiderman2/400/500',
    rating: 4.8
  },
  // Xbox
  {
    id: '7',
    title: 'Forza Horizon 5',
    platform: ['PC', 'Xbox Series X', 'Xbox One'],
    genre: 'Racing',
    price: 249.90,
    image: 'https://picsum.photos/seed/forza5/400/500',
    rating: 4.7
  },
  {
    id: '8',
    title: 'Halo Infinite',
    platform: ['PC', 'Xbox Series X', 'Xbox One'],
    genre: 'FPS',
    price: 149.90,
    image: 'https://picsum.photos/seed/halo/400/500',
    rating: 4.3
  },
  {
    id: '9',
    title: 'Starfield',
    platform: ['PC', 'Xbox Series X'],
    genre: 'RPG',
    price: 299.90,
    image: 'https://picsum.photos/seed/starfield/400/500',
    rating: 4.2
  },
  // Nintendo Switch
  {
    id: '10',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: ['Switch'],
    genre: 'Action-Adventure',
    price: 349.90,
    image: 'https://picsum.photos/seed/zelda/400/500',
    rating: 4.9
  },
  {
    id: '11',
    title: 'Super Mario Odyssey',
    platform: ['Switch'],
    genre: 'Platformer',
    price: 299.90,
    image: 'https://picsum.photos/seed/mario/400/500',
    rating: 4.8
  },
  {
    id: '12',
    title: 'Animal Crossing: New Horizons',
    platform: ['Switch'],
    genre: 'Simulation',
    price: 299.90,
    image: 'https://picsum.photos/seed/animalcrossing/400/500',
    rating: 4.7
  },
  // Retro / Others
  {
    id: '13',
    title: 'Grand Theft Auto V',
    platform: ['PC', 'PS5', 'Xbox Series X', 'PS4', 'Xbox One', 'PS3', 'Xbox 360'],
    genre: 'Action-Adventure',
    price: 79.90,
    image: 'https://picsum.photos/seed/gtav/400/500',
    rating: 4.8
  },
  {
    id: '14',
    title: 'Minecraft',
    platform: ['PC', 'PS5', 'Xbox Series X', 'Switch', 'Mobile'],
    genre: 'Sandbox',
    price: 99.90,
    image: 'https://picsum.photos/seed/minecraft/400/500',
    rating: 4.9
  },
  {
    id: '15',
    title: 'Red Dead Redemption 2',
    platform: ['PC', 'PS4', 'Xbox One'],
    genre: 'Action-Adventure',
    price: 149.90,
    image: 'https://picsum.photos/seed/rdr2/400/500',
    rating: 4.9
  },
  {
    id: '16',
    title: 'Final Fantasy VII Rebirth',
    platform: ['PS5'],
    genre: 'RPG',
    price: 349.90,
    image: 'https://picsum.photos/seed/ff7r/400/500',
    rating: 4.9
  },
  {
    id: '17',
    title: 'Baldur\'s Gate 3',
    platform: ['PC', 'PS5', 'Xbox Series X'],
    genre: 'RPG',
    price: 249.90,
    image: 'https://picsum.photos/seed/bg3/400/500',
    rating: 5.0
  },
  {
    id: '18',
    title: 'Resident Evil 4 Remake',
    platform: ['PC', 'PS5', 'Xbox Series X', 'PS4'],
    genre: 'Horror',
    price: 199.90,
    image: 'https://picsum.photos/seed/re4/400/500',
    rating: 4.8
  },
  {
    id: '19',
    title: 'Street Fighter 6',
    platform: ['PC', 'PS5', 'Xbox Series X', 'PS4'],
    genre: 'Fighting',
    price: 249.90,
    image: 'https://picsum.photos/seed/sf6/400/500',
    rating: 4.6
  },
  {
    id: '20',
    title: 'Hogwarts Legacy',
    platform: ['PC', 'PS5', 'Xbox Series X', 'PS4', 'Xbox One', 'Switch'],
    genre: 'Action RPG',
    price: 249.90,
    image: 'https://picsum.photos/seed/hogwarts/400/500',
    rating: 4.5
  }
];
