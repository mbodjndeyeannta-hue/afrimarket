import React from 'react';
import { ShieldCheck, Lock, Smartphone, UserCheck, X } from 'lucide-react';

const Securite = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const cards = [
    { icon: <ShieldCheck className="text-green-500" />, title: "Vérification Admin", desc: "Chaque annonce est validée manuellement pour éviter les arnaques." },
    { icon: <Smartphone className="text-orange-500" />, title: "Paiement Wave", desc: "Transactions sécurisées par le n°1 du paiement mobile au Sénégal." },
    { icon: <Lock className="text-blue-500" />, title: "Données Cryptées", desc: "Vos numéros ne sont utilisés que pour la mise en relation commerciale." }
  ];
  return (
    <div className="fixed inset-0 z-[300] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-[1000] uppercase italic tracking-tighter">Sécurité <span className="text-orange-600">AfriMarket</span></h2>
          <button onClick={onClose} className="bg-black text-white p-4 rounded-full"><X size={24}/></button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 group hover:-translate-y-4 transition-all duration-500">
              <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="font-black uppercase text-sm mb-4 italic">{card.title}</h3>
              <p className="text-gray-400 text-xs font-bold leading-relaxed italic">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Securite;