import React from 'react';
import { Game } from '../data/games';
import { Star, ShoppingCart } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onAddToCart: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {game.platform.slice(0, 2).map(p => (
            <span key={p} className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase">
              {p}
            </span>
          ))}
          {game.platform.length > 2 && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase">
              +{game.platform.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{game.genre}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{game.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {game.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Preço</span>
            <span className="text-lg font-extrabold text-gray-900">
              R$ {game.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <button 
            onClick={onAddToCart}
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
