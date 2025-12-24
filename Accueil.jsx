import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import ProductList from './ProductList';

const Accueil = ({ onStartSelling }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      <section className="px-6 py-12 max-w-[1400px] mx-auto">
        <div className="bg-[#0f0f0f] rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl group">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 bg-orange-600/20 border border-orange-600/30 w-fit px-5 py-2 rounded-full mb-10 backdrop-blur-md">
              <Zap size={16} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Exclusivité Sénégal 2025</span>
            </div>
            <h2 className="text-6xl md:text-[100px] font-[1000] mb-8 leading-[0.8] uppercase italic tracking-tighter">
              DOMINER LE <span className="text-orange-600 text-glow">MARKET.</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-lg italic border-l-4 border-orange-600 pl-8">
              La plateforme d'élite pour vendre vos articles. Une visibilité maximale pour un business explosif.
            </p>
            <button 
              onClick={onStartSelling}
              className="bg-white text-black px-12 py-6 rounded-3xl font-black uppercase text-sm tracking-widest flex items-center gap-4 hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-2xl"
            >
              Lancer mon annonce <ArrowRight size={20} />
            </button>
          </div>
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full group-hover:bg-orange-600/20 transition-all duration-700"></div>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-6 mb-10 flex items-center justify-between">
        <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter">Flux Récent</h3>
        <Sparkles className="text-orange-600" size={32} />
      </div>
      <ProductList />
    </div>
  );
};
export default Accueil;