import React from 'react';
import { X, ShoppingBag, Trash2, CheckCircle2 } from 'lucide-react';
import { Game } from '../data/games';
import { motion, AnimatePresence } from 'motion/react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Game[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
  isProcessing: boolean;
}

export const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onCheckout,
  isProcessing
}) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="bg-white h-full w-full max-w-md shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Seu Carrinho</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-gray-300" size={40} />
              </div>
              <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
              <button 
                onClick={onClose}
                className="mt-4 text-emerald-600 font-semibold hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4 p-3 bg-gray-50 rounded-xl group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-24 object-cover rounded-lg shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.platform}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-600">R$ {item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => onRemove(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-2xl font-bold text-gray-900">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={isProcessing}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Finalizar Compra
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Shield size={12} /> Pagamento 100% Seguro via ConectaBrasil
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Shield = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
