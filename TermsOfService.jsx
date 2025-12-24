import React from 'react';
import { X, Gavel, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const TermsOfService = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[60px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] flex flex-col">
        
        {/* Header Style "Million Dollar" */}
        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-black p-3 rounded-2xl shadow-xl">
              <Gavel className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter leading-none">Conditions</h2>
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mt-1">Règles de la plateforme</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
            <X size={20} />
          </button>
        </div>

        {/* Contenu des conditions */}
        <div className="p-10 overflow-y-auto space-y-10 text-gray-600">
          
          {/* Section Promo */}
          <section className="bg-orange-50 p-8 rounded-[40px] border border-orange-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-orange-900">
                <CheckCircle2 size={20} className="text-orange-600" />
                <h3 className="font-black uppercase text-sm italic">Offre Spéciale : 5 Annonces / 1000F</h3>
              </div>
              <ul className="space-y-3 text-sm font-bold text-orange-800 italic">
                <li>• Le paiement de 1000F donne droit à l'activation de 5 annonces.</li>
                <li>• La validation est effectuée manuellement par l'admin après réception du transfert Wave.</li>
                <li>• Les annonces restent actives jusqu'à ce que le stock soit épuisé.</li>
              </ul>
            </div>
            <ShieldCheck className="absolute -right-4 -bottom-4 text-orange-600/10" size={120} />
          </section>

          {/* Section Interdictions */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-black">
              <AlertTriangle size={20} className="text-red-500" />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Produits Interdits</h3>
            </div>
            <p className="text-sm leading-relaxed font-medium italic mb-4">
              AfriMarket interdit formellement la vente de :
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Produits illégaux', 'Médicaments', 'Armes', 'Articles contrefaits'].map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded-2xl text-[10px] font-black uppercase text-gray-400 border border-gray-100 italic">
                  ❌ {item}
                </div>
              ))}
            </div>
          </section>

          {/* Responsabilité */}
          <section className="border-l-4 border-black pl-6">
            <h3 className="font-black uppercase text-xs tracking-widest text-black mb-3">Responsabilité</h3>
            <p className="text-sm leading-relaxed font-medium italic">
              AfriMarket est une plateforme de mise en relation. Nous ne sommes pas responsables de la qualité des produits ou des litiges entre acheteurs et vendeurs. Vérifiez toujours l'article avant de payer le vendeur.
            </p>
          </section>

          <p className="text-[10px] text-gray-300 font-bold text-center uppercase tracking-widest">
            AFRIMARKET SENEGAL • TOUS DROITS RÉSERVÉS 2025
          </p>
        </div>

        {/* Action Button */}
        <div className="p-8 bg-white border-t border-gray-50">
          <button 
            onClick={onClose}
            className="w-full bg-black text-white py-6 rounded-3xl font-[1000] uppercase text-xs tracking-[0.3em] hover:bg-orange-600 transition-all shadow-2xl active:scale-95"
          >
            J'accepte les conditions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;