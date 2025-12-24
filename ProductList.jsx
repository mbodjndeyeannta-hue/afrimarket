import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  MapPin, 
  MessageCircle, 
  Tag, 
  Clock, 
  ShoppingBag, 
  AlertCircle,
  Loader2,
  ArrowUpRight
} from 'lucide-react';

const ProductList = ({ searchTerm, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_verified', true); // On n'affiche que les produits validés par l'admin

      // FILTRE PAR CATÉGORIE
      if (selectedCategory && selectedCategory !== 'Tous') {
        query = query.eq('category', selectedCategory);
      }

      // RECHERCHE INTELLIGENTE (Titre OU Localisation)
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      // TRI : Le plus récent en premier
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="text-orange-600 animate-spin mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Chargement du flux...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
        <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500 font-bold italic">Aucun article trouvé pour cette recherche.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-orange-600 font-black text-[10px] uppercase tracking-widest underline"
        >
          Réinitialiser
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((p) => (
        <div 
          key={p.id} 
          className="group bg-white rounded-[35px] overflow-hidden border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full"
        >
          {/* IMAGE SECTION */}
          <div className="relative h-72 overflow-hidden bg-gray-100">
            <img 
              src={p.image_url} 
              alt={p.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Badge Prix */}
            <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-[1000] text-sm shadow-xl border border-white/10">
              {p.price_total.toLocaleString()} <span className="text-orange-500 text-[10px]">CFA</span>
            </div>
            {/* Badge Catégorie */}
            <div className="absolute top-5 left-5 bg-orange-600 text-white px-3 py-1 rounded-full font-black text-[8px] uppercase tracking-tighter shadow-lg">
              {p.category}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-orange-600 transition-colors">
                 {p.title}
               </h3>
               <ArrowUpRight className="text-gray-300 group-hover:text-orange-600 transition-all" size={20} />
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <MapPin size={12} className="text-orange-600" />
                {p.location || 'Sénégal'}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <Clock size={12} />
                {new Date(p.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <a 
              href={`https://wa.me/${p.telephone.replace(/\s/g, '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre article : *${p.title}* sur AfriMarket.`)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 w-full bg-gray-50 hover:bg-black group-hover:bg-black text-black group-hover:text-white py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em]"
            >
              <MessageCircle size={18} className="text-orange-600" />
              Contact WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;