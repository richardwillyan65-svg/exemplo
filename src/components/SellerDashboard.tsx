import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { Sale, UserProfile } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  Package,
  ArrowLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface SellerDashboardProps {
  user: UserProfile;
  onBack: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ user, onBack }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'sales'),
      where('sellerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const salesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sale[];
      setSales(salesData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar vendas:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'sales'), {
        sellerId: user.uid,
        productName,
        amount: parseFloat(amount),
        cost: parseFloat(cost),
        status: 'completed',
        createdAt: serverTimestamp()
      });
      setProductName('');
      setAmount('');
      setCost('');
      setShowAddForm(false);
    } catch (err) {
      console.error("Erro ao adicionar venda:", err);
    }
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalCost = sales.reduce((acc, sale) => acc + sale.cost, 0);
  const totalProfit = totalRevenue - totalCost;

  const chartData = sales.slice(0, 7).reverse().map(sale => ({
    name: sale.productName.substring(0, 10),
    lucro: sale.amount - sale.cost,
    venda: sale.amount
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar para Loja
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-sm"
          >
            <Plus size={20} />
            Nova Venda
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Receita Total</span>
              <DollarSign className="text-emerald-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">R$ {totalRevenue.toFixed(2)}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Custo Total</span>
              <TrendingDown className="text-red-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">R$ {totalCost.toFixed(2)}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Lucro Líquido</span>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">R$ {totalProfit.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Desempenho Recente</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="lucro" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Tabela de Vendas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-4 font-semibold text-gray-600 text-sm">Produto</th>
                    <th className="pb-4 font-semibold text-gray-600 text-sm">Venda</th>
                    <th className="pb-4 font-semibold text-gray-600 text-sm">Custo</th>
                    <th className="pb-4 font-semibold text-gray-600 text-sm">Lucro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-sm text-gray-900 font-medium">{sale.productName}</td>
                      <td className="py-4 text-sm text-gray-600">R$ {sale.amount.toFixed(2)}</td>
                      <td className="py-4 text-sm text-gray-600">R$ {sale.cost.toFixed(2)}</td>
                      <td className={`py-4 text-sm font-bold ${sale.amount - sale.cost >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        R$ {(sale.amount - sale.cost).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {sales.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400 text-sm italic">
                        Nenhuma venda registrada ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
              <button 
                onClick={() => setShowAddForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="text-emerald-600" />
                Registrar Venda
              </h2>
              <form onSubmit={handleAddSale} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ex: Smartphone XYZ"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor de Venda (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custo do Produto (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-md mt-4"
                >
                  Confirmar Venda
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const X = ({ size, onClick }: { size: number, onClick?: () => void }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    onClick={onClick}
    className="cursor-pointer"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
