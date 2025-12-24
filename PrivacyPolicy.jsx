import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Bell, Smartphone, CheckCircle } from 'lucide-react';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[60px] overflow-hidden shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        
        {/* HEADER MODERNE */}
        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-200">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-[1000] uppercase italic tracking-tighter leading-none">Confidentialité</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">Protection des données</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white p-4 rounded-full shadow-md hover:rotate-90 transition-transform active:scale-90">
            <X size={20} />
          </button>
        </div>

        {/* CONTENU LÉGAL ÉLÉGANT */}
        <div className="p-10 overflow-y-auto space-y-10 text-gray-600">
          
          {/* Section 1 */}
          <section className="relative">
            <div className="flex items-center gap-3 mb-4 text-black">
              <Lock size={20} className="text-orange-600" />
              <h3 className="font-black uppercase text-[11px] tracking-[0.2em]">Données Collectées</h3>
            </div>
            <p className="text-sm leading-relaxed font-medium italic pl-8 border-l-2 border-orange-100">
              AfriMarket collecte uniquement votre **numéro WhatsApp**, le **titre**, le **prix** et les **images** de vos annonces. Ces informations sont nécessaires pour la mise en relation entre acheteurs et vendeurs.
            </p>
          </section>

          {/* Section 2 (La plus importante pour le Sénégal) */}
          <section className="bg-orange-50 p-8 rounded-[40px] border border-orange-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-orange-900">
                <Smartphone size={20} className="text-orange-600" />
                <h3 className="font-black uppercase text-[11px] tracking-[0.2em]">Sécurité des Paiements</h3>
              </div>
              <p className="text-sm leading-relaxed font-bold text-orange-800/80 italic">
                Nous n'avons **aucun accès** à votre compte Wave. Le paiement de 1000F se fait via l'application officielle Wave. Ne partagez jamais votre code PIN sur notre site.
              </p>
            </div>
            <CheckCircle className="absolute -right-6 -bottom-6 text-orange-600/10" size={150} />
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-black">
              <EyeOff size={20} className="text-orange-600" />
              <h3 className="font-black uppercase text-[11px] tracking-[0.2em]">Zéro Partage Tiers</h3>
            </div>
            <p className="text-sm leading-relaxed font-medium italic pl-8 border-l-2 border-orange-100">
              Vos données ne sont jamais vendues ou partagées avec des entreprises publicitaires. Elles restent au sein de l'écosystème AfriMarket.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-black">
              <Bell size={20} className="text-orange-600" />
              <h3 className="font-black uppercase text-[11px] tracking-[0.2em]">Vos Droits</h3>
            </div>
            <p className="text-sm leading-relaxed font-medium italic pl-8 border-l-2 border-orange-100">
              Vous pouvez demander la suppression définitive de vos annonces et de votre numéro de téléphone à tout moment en contactant notre support VIP.
            </p>
          </section>

          <div className="pt-10 text-center border-t border-gray-50">
            <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.5em]">
              Dernière mise à jour : 2025 • Mbacké, Sénégal
            </p>
          </div>
        </div>

        {/* BOUTON D'ACTION */}
        <div className="p-8 bg-gray-50 flex justify-center">
          <button 
            onClick={onClose}
            className="bg-black text-white px-12 py-5 rounded-[25px] font-[1000] uppercase text-[10px] tracking-[0.3em] hover:bg-orange-600 transition-all shadow-xl active:scale-95"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;