import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5511999999999'; // Exemplo de número
  const message = 'Olá! Gostaria de suporte no ConectaBrasil Marketplace.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center justify-center"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
};
