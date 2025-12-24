import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  CheckCircle, 
  Trash2, 
  Smartphone, 
  ArrowLeft, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Loader2
} from 'lucide-react';

const AdminPanel = ({ onBack }) => {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const grouped = data.reduce((acc, product) => {
        const tel = product.telephone || 'Inconnu';
        if (!acc[tel]) acc[tel] = [];
        acc[tel].push(product);
        return acc;
      }, {});
      setGroups(grouped);
    }
    setLoading(false);
  };

  // --- FONCTION : VALIDER UN PACK (Tous les produits d'un numéro) ---
  const verifyPack = async (telephone) => {
    const { error } = await supabase
      .from('products')
      .update({ is_verified: true })
      .eq('telephone', telephone);

    if (!error) {
      alert(`Pack validé pour : ${telephone}`);
      fetchAllProducts(); 
    } else {
      alert("Erreur lors de la validation.");
    }
  };

  // --- FONCTION : SUPPRIMER UN PRODUIT ---
  const deleteProduct = async (id) => {
    if (window.confirm("🗑️ Voulez-vous vraiment supprimer définitivement cette annonce ?")) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (!error) {
        // Mise à jour locale pour éviter de tout recharger
        const newGroups = { ...groups };
        Object.keys(newGroups).forEach(tel => {
          newGroups[tel] = newGroups[tel].filter(p => p.id !== id);
          if (newGroups[tel].length === 0) delete newGroups[tel];
        });
        setGroups(newGroups);
      } else {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
      <p className="font-black uppercase tracking-widest text-[10px]">Accès Admin...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Admin */}
      <div className="bg-black text-white p-8 rounded-b-[40px] shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="bg-white/10 p-3 rounded-2xl hover:bg-orange-600 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter">
            Gestion <span className="text-orange-600 text-glow">Packs</span>
          </h2>
        </div>
        <ShieldCheck className="text-orange-600 opacity-50" size={32} />
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8 mt-4">
        {Object.keys(groups).length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] border shadow-sm text-gray-400">
            <AlertTriangle className="mx-auto mb-4" size={48} />
            <p className="font-bold">Aucune annonce dans la base.</p>
          </div>
        ) : (
          Object.entries(groups).map(([tel, items]) => (
            <div key={tel} className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100">
              {/* Entête du groupe par téléphone */}
              <div className="p-8 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="bg-black text-white p-4 rounded-2xl shadow-lg">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Vendeur</p>
                    <p className="text-xl font-black italic">{tel}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => verifyPack(tel)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-[1000] text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-green-100 transition-all active:scale-95"
                >
                  Valider Pack ({items.length})
                </button>
              </div>

              {/* Liste des annonces du numéro */}
              <div className="p-4 space-y-2">
                {items.map((product) => (
                  <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50 rounded-[25px] transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={product.image_url} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-black uppercase italic text-[11px] leading-none">{product.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${product.is_verified ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {product.is_verified ? 'EN LIGNE' : 'EN ATTENTE'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a href={product.image_url} target="_blank" rel="noreferrer" className="p-3 text-gray-300 hover:text-black">
                        <ExternalLink size={16} />
                      </a>
                      {/* BOUTON SUPPRIMER */}
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-3 text-gray-300 hover:text-red-600 transition-colors hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;