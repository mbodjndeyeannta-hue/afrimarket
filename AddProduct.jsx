import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import imageCompression from 'browser-image-compression';
import { 
  ArrowLeft, 
  Camera, 
  Send, 
  Smartphone, 
  Tag, 
  MapPin, 
  CheckCircle2,
  Loader2 
} from 'lucide-react';

const AddProduct = ({ onBack }) => {
  // États du formulaire
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [telephone, setTelephone] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Électronique');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ['Électronique', 'Mode', 'Beauté', 'Maison', 'Véhicules', 'Immobilier', 'Autres'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Veuillez ajouter une photo !");
    
    setLoading(true);

    try {
      let imageUrl = "";
      
      // --- COMPRESSION DE L'IMAGE ---
      const options = {
        maxSizeMB: 0.7, // Moins de 1Mo pour la rapidité
        maxWidthOrHeight: 1200,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(image, options);
      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random()}.${fileExt}`;

      // --- UPLOAD VERS SUPABASE STORAGE ---
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, compressedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrlData.publicUrl;

      // --- INSERTION DANS LA TABLE PRODUCTS ---
      const { error: insertError } = await supabase.from('products').insert([
        { 
          title, 
          price_total: parseInt(price), 
          telephone, 
          location: location || 'Sénégal', 
          category, 
          image_url: imageUrl, 
          is_verified: false 
        }
      ]);

      if (insertError) throw insertError;

      // --- REDIRECTION WHATSAPP POUR VALIDATION ---
      const monNumeroAdmin = "221766729561"; // TON NUMÉRO ICI
      const text = `Salut AfriMarket ! Je viens de publier : *${title.toUpperCase()}* à *${location}*. Je souhaite activer mon pack.`;
      window.location.href = `https://wa.me/${monNumeroAdmin}?text=${encodeURIComponent(text)}`;

    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="bg-black text-white p-8 rounded-b-[40px] shadow-2xl flex items-center gap-6">
        <button onClick={onBack} className="bg-white/10 p-3 rounded-2xl hover:bg-orange-600 transition-all">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter">
          Nouvelle <span className="text-orange-600">Annonce</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto p-6 -mt-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-[45px] shadow-2xl p-8 space-y-8 border border-gray-50">
          
          {/* Upload Photo */}
          <div className="flex flex-col items-center">
            <label className="w-full h-72 border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/30 transition-all group overflow-hidden relative bg-gray-50">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="bg-white p-5 rounded-3xl shadow-sm group-hover:scale-110 transition-transform">
                    <Camera size={32} className="text-orange-600" />
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center px-4">
                    Cliquez pour ajouter une photo de l'article
                  </span>
                </>
              )}
              <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
            </label>
          </div>

          <div className="space-y-4">
            {/* Titre */}
            <div className="relative">
              <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
              <input type="text" placeholder="NOM DE L'ARTICLE" className="w-full pl-16 pr-8 py-6 rounded-[25px] bg-gray-50 font-bold outline-none border-2 border-transparent focus:border-orange-600 transition-all" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            {/* Prix et Localisation */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xs">FCFA</span>
                    <input type="number" placeholder="PRIX" className="w-full pl-16 pr-8 py-6 rounded-[25px] bg-gray-50 font-bold outline-none border-2 border-transparent focus:border-orange-600 transition-all" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600" size={18}/>
                    <input type="text" placeholder="VILLE (EX: DAKAR)" className="w-full pl-16 pr-8 py-6 rounded-[25px] bg-gray-50 font-bold outline-none border-2 border-transparent focus:border-orange-600 transition-all" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
            </div>

            {/* Téléphone */}
            <div className="relative">
              <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
              <input type="tel" placeholder="NUMÉRO WHATSAPP" className="w-full pl-16 pr-8 py-6 rounded-[25px] bg-gray-50 font-bold outline-none border-2 border-transparent focus:border-orange-600 transition-all" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
            </div>
          </div>

          {/* Choix Catégorie */}
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 mb-4 ml-2 tracking-widest">Catégorie du produit</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat} type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton de validation */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-black text-white py-7 rounded-[30px] font-black uppercase text-xs tracking-[0.3em] shadow-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <> <Loader2 className="animate-spin" size={20}/> ENVOI EN COURS...</>
            ) : (
              <> PUBLIER MAINTENANT <Send size={18}/></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;