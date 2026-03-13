import React from 'react';
import { Shield, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <Shield className="text-emerald-500" size={24} />
              <span className="text-xl font-bold tracking-tight">ConectaBrasil</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              O marketplace mais seguro do Brasil. Conectando vendedores verificados a clientes exigentes em todas as regiões do país.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Início</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Produtos</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Seja um Vendedor</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Sobre Nós</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Segurança</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Termos de Uso</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Privacidade</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Verificação de Documentos</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Lei Geral de Proteção de Dados</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-500" />
                <span>São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500" />
                <span>+55 (11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500" />
                <span>suporte@conectabrasil.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>© 2026 ConectaBrasil Marketplace. Todos os direitos reservados. Operação 100% legalizada conforme as leis brasileiras.</p>
        </div>
      </div>
    </footer>
  );
};
