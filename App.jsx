import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import AdminPanel from './components/AdminPanel';

// IMPORTATION DES COMPOSANTS LÉGAUX ET CONTACT
import Contact from './components/Contact';
import Securite from './components/Securite';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

import { 
  Plus, Globe, ShieldCheck, Lock, Instagram, Facebook, 
  Zap, ShoppingBag, Heart, LayoutGrid, 
  Search, MapPin, Mail, Phone, Shield, ArrowUpRight
} from 'lucide-react';

function App() {
  // Navigation Principale
  const [currentPage, setCurrentPage] = useState('home');
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Recherche et Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // États pour les Modales (Fenêtres surgissantes)
  const [showContact, setShowContact] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const categories = ['Tous', 'Électronique', 'Mode', 'Beauté', 'Maison', 'Véhicules', 'Immobilier', 'Autres'];

  const tryAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "1650") { 
      setIsAdminAuthenticated(true);
      setCurrentPage('admin');
      setAdminPassword(""); 
    } else {
      alert("Code incorrect. Accès réservé à l'administrateur.");
      setAdminPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* --- NAVIGATION ELITE --- */}
      <nav className="sticky top-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-gray-100 px-6 py-5">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="bg-black p-2.5 rounded-2xl group-hover:bg-orange-600 transition-all duration-500 shadow-xl text-white">
              <Globe size={24} />
            </div>
            <h1 className="text-2xl font-[1000] tracking-tighter uppercase italic leading-none">
              AFRI<span className="text-orange-600">MARKET</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => setCurrentPage('add')} 
              className="bg-orange-600 hover:bg-black text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-200 transition-all duration-500 flex items-center gap-3 active:scale-95"
            >
              <Plus size={20} /> Publier
            </button>
            <button onClick={() => setCurrentPage('login')} className="text-gray-200 hover:text-orange-600 transition-colors ml-2">
              <ShieldCheck size={22} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        
        {/* --- PAGE D'ACCUEIL --- */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-1000">
            
            {/* HERO SECTION SÉNÉGAL */}
            <section className="px-6 py-12 max-w-[1400px] mx-auto">
               <div className="bg-[#0f0f0f] rounded-[50px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full w-fit mb-8">
                        <Zap size={14} className="fill-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Le n°1 du e-commerce au Sénégal</span>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-[1000] mb-8 leading-[0.85] uppercase italic tracking-tighter">
                      VENDRE AU <br/> <span className="text-orange-600 text-glow">SÉNÉGAL.</span>
                    </h2>
                    
                    {/* RECHERCHE INTELLIGENTE */}
                    <div className="relative max-w-xl mb-10 group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={24} />
                      <input 
                        type="text" 
                        placeholder="Cherchez un article ou une ville..." 
                        className="w-full p-7 pl-16 rounded-3xl bg-white/10 border border-white/20 text-white outline-none focus:bg-white focus:text-black transition-all font-bold text-lg shadow-2xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* BOUTONS CATÉGORIES */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/50' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ShoppingBag className="absolute -right-20 -bottom-20 text-white/[0.03] -rotate-12" size={600} />
               </div>
            </section>

            {/* FLUX DE PRODUITS */}
            <div className="max-w-[1400px] mx-auto pb-20 px-6">
               <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-8">
                  <div>
                    <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter">Flux National</h3>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 italic">Dakar • Touba • Mbacké • Thiès</p>
                  </div>
                  <LayoutGrid className="text-orange-600 opacity-20" size={40} />
               </div>
               <ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />
            </div>
          </div>
        )}

        {currentPage === 'add' && <AddProduct onBack={() => setCurrentPage('home')} />}

        {currentPage === 'login' && (
           <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50">
             <div className="w-full max-w-md bg-white p-12 rounded-[60px] shadow-2xl text-center border border-gray-100">
                <Lock className="mx-auto mb-8 text-orange-600" size={48} />
                <h2 className="text-3xl font-black uppercase italic mb-8 tracking-tighter">Admin Access</h2>
                <form onSubmit={tryAdminLogin} className="space-y-6">
                   <input 
                    type="password" 
                    className="w-full p-8 rounded-[30px] bg-gray-50 text-center text-4xl font-black outline-none border-4 border-transparent focus:border-orange-600 transition-all shadow-inner" 
                    placeholder="••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    autoFocus
                   />
                   <button className="w-full bg-black text-white py-6 rounded-[30px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl">Déverrouiller</button>
                </form>
             </div>
           </div>
        )}

        {currentPage === 'admin' && isAdminAuthenticated && (
          <AdminPanel onBack={() => { setIsAdminAuthenticated(false); setCurrentPage('home'); }} />
        )}
      </main>

      {/* --- FOOTER PROFESSIONNEL --- */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xl font-[1000] uppercase italic tracking-tighter mb-8 flex items-center gap-2">
                <Globe size={18} className="text-orange-600"/> AFRIMARKET
              </h4>
              <p className="text-gray-400 font-medium text-lg max-w-md leading-relaxed italic">
                La marketplace n°1 pour acheter et vendre rapidement partout au Sénégal. Simple, Rapide, Sécurisé.
              </p>
            </div>
            
            <div>
              <h5 className="font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-orange-600 italic underline underline-offset-8 decoration-2">Assistance</h5>
              <ul className="space-y-4 font-bold text-gray-400 text-sm">
                <li onClick={() => setShowContact(true)} className="hover:text-black cursor-pointer transition-colors flex items-center gap-2">Nous contacter <ArrowUpRight size={12}/></li>
                <li onClick={() => setShowSecurity(true)} className="hover:text-black cursor-pointer transition-colors flex items-center gap-2 text-black">Sécurité & Paiement <Shield size={12} className="text-green-500"/></li>
                <li className="flex items-center gap-2"><Phone size={14}/> +221 76 672 95 61</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-orange-600 italic underline underline-offset-8 decoration-2">Légal</h5>
              <ul className="space-y-4 font-bold text-gray-400 text-sm">
                <li onClick={() => setShowTerms(true)} className="hover:text-black cursor-pointer transition-colors">Conditions (CGU)</li>
                <li onClick={() => setShowPrivacy(true)} className="hover:text-black cursor-pointer transition-colors">Politique de Confidentialité</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">© 2025 AfriMarket Senegal Group • Dakar • Touba</p>
            <div className="flex gap-4 opacity-30 group cursor-default">
              <Heart size={14} className="text-red-500 fill-red-500 group-hover:scale-150 transition-transform" />
            </div>
          </div>
        </div>
      </footer>

      {/* --- RENDU DES MODALES (FENÊTRES POLITIQUES) --- */}
      <Contact isOpen={showContact} onClose={() => setShowContact(false)} />
      <Securite isOpen={showSecurity} onClose={() => setShowSecurity(false)} />
      <PrivacyPolicy isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} />

    </div>
  );
}

export default App;