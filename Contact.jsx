import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[60px] flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in">
        <div className="bg-black text-white p-12 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter mb-4 text-orange-600">Contact VIP</h2>
            <p className="text-gray-400 font-medium italic">Besoin d'aide ou d'une validation rapide ? Notre équipe est là.</p>
          </div>
          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-orange-600 transition-colors"><Phone size={24}/></div>
              <div><p className="text-[10px] text-gray-500 font-black uppercase">WhatsApp</p><p className="font-black">+221 76 672 95 61</p></div>
            </div>
          </div>
        </div>
        <div className="p-12 flex-grow">
          <h3 className="text-2xl font-black mb-8 uppercase italic italic">Envoyez-nous un message</h3>
          <form className="space-y-6">
            <input type="text" placeholder="VOTRE NOM" className="w-full p-6 rounded-2xl bg-gray-50 font-black outline-none border-2 border-transparent focus:border-orange-600 transition-all" />
            <textarea placeholder="MESSAGE" className="w-full p-6 rounded-2xl bg-gray-50 font-black outline-none border-2 border-transparent focus:border-orange-600 transition-all h-32" />
            <button className="w-full bg-orange-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Envoyer Directement</button>
          </form>
          <button onClick={onClose} className="mt-6 text-gray-300 font-black uppercase text-[10px] tracking-widest block mx-auto underline">Fermer la fenêtre</button>
        </div>
      </div>
    </div>
  );
};
export default Contact;