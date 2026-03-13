import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy
} from 'firebase/firestore';
import { Sale, UserProfile } from '../types';
import { 
  ShoppingBag, 
  ArrowLeft,
  Clock,
  CheckCircle2,
  Package
} from 'lucide-react';

interface CustomerDashboardProps {
  user: UserProfile;
  onBack: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onBack }) => {
  const [purchases, setPurchases] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'sales'),
      where('customerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const purchasesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sale[];
      setPurchases(purchasesData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar compras:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar para Loja
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <ShoppingBag className="text-emerald-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas Compras</h1>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          ) : purchases.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-gray-300" size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma compra ainda</h3>
              <p className="text-gray-500 mb-6">Você ainda não realizou nenhuma compra no marketplace.</p>
              <button 
                onClick={onBack}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
              >
                Explorar Jogos
              </button>
            </div>
          ) : (
            purchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Package className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{purchase.productName}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} />
                        {purchase.createdAt?.toDate ? purchase.createdAt.toDate().toLocaleDateString() : 'Recentemente'}
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        R$ {purchase.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  {purchase.status === 'completed' ? 'Concluído' : purchase.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
