import React from 'react';
import { Shield, User, LogOut, LayoutDashboard, ShoppingCart, ShoppingBag } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  cartCount: number;
  onLogout: () => void;
  onAuthClick: () => void;
  onDashboardClick: () => void;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onLogout, onAuthClick, onDashboardClick, onCartClick }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <Shield className="text-emerald-600" size={28} />
            <span className="text-xl font-bold tracking-tight text-gray-900">ConectaBrasil</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              onClick={onCartClick}
              className="relative mr-2 group cursor-pointer"
            >
              <ShoppingCart size={24} className="text-gray-600 group-hover:text-emerald-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            
            {user ? (
              <>
                {user.role === 'seller' ? (
                  <button 
                    onClick={onDashboardClick}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Painel do Vendedor
                  </button>
                ) : (
                  <button 
                    onClick={onDashboardClick}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <ShoppingBag size={18} />
                    Minhas Compras
                  </button>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                  <User size={16} />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm"
              >
                Entrar / Cadastrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
