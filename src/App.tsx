import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AuthForm } from './components/AuthForm';
import { SellerDashboard } from './components/SellerDashboard';
import { CustomerDashboard } from './components/CustomerDashboard';
import { CartModal } from './components/CartModal';
import { GameCard } from './components/GameCard';
import { Toast } from './components/Toast';
import { GAMES, Game } from './data/games';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { 
  ShieldCheck, 
  Truck, 
  Users, 
  Zap, 
  CheckCircle2,
  Lock,
  Globe,
  ArrowRight,
  Search,
  Filter,
  Gamepad2,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todas');
  const [cart, setCart] = useState<Game[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const platforms = ['Todas', 'PC', 'PS5', 'Xbox Series X', 'Switch', 'PS4', 'Xbox One'];

  const handleAddToCart = (game: Game) => {
    setCart(prev => [...prev, game]);
    setToast(`${game.title} adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (!user) {
      setShowAuth(true);
      setShowCart(false);
      return;
    }

    if (cart.length === 0) return;

    setIsCheckingOut(true);
    try {
      // In a real app, we would create a sale for each item or a single order with multiple items.
      // Here we'll create a sale record for each item to match the existing Sale type.
      const checkoutPromises = cart.map(item => 
        addDoc(collection(db, 'sales'), {
          sellerId: 'system', // In a real app, this would be the actual seller's ID
          customerId: user.uid,
          productName: item.title,
          amount: item.price,
          cost: item.price * 0.7, // Mock cost for profit calculation
          status: 'completed',
          createdAt: serverTimestamp()
        })
      );

      await Promise.all(checkoutPromises);
      setCart([]);
      setShowCart(false);
      setToast('Compra realizada com sucesso! Obrigado por escolher a ConectaBrasil.');
    } catch (err) {
      console.error("Erro no checkout:", err);
      setToast('Erro ao processar compra. Tente novamente.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'Todas' || game.platform.includes(selectedPlatform);
    return matchesSearch && matchesPlatform;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setView('home');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (view === 'dashboard' && user) {
    if (user.role === 'seller') {
      return (
        <>
          <SellerDashboard user={user} onBack={() => setView('home')} />
          <WhatsAppButton />
        </>
      );
    } else {
      return (
        <>
          <CustomerDashboard user={user} onBack={() => setView('home')} />
          <WhatsAppButton />
        </>
      );
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar 
        user={user} 
        cartCount={cart.length}
        onLogout={handleLogout} 
        onAuthClick={() => setShowAuth(true)}
        onDashboardClick={() => setView('dashboard')}
        onCartClick={() => setShowCart(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 rounded-full">
                  100% Seguro • 100% Brasileiro • 100% Legal
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
                  O Maior Marketplace de <br />
                  <span className="text-emerald-600">Games do Brasil.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
                  Encontre jogos de todas as plataformas com os melhores preços e segurança total. 
                  Sua diversão garantida em um só lugar.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-12 relative">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Search className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={24} />
                    </div>
                    <input 
                      type="text"
                      placeholder="Busque por jogos, gêneros ou plataformas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-14 pr-4 py-6 bg-white border-2 border-gray-100 rounded-2xl text-lg focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all shadow-xl shadow-gray-100"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                        selectedPlatform === platform 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Games Grid Section */}
        <section className="py-20" id="games">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Gamepad2 className="text-emerald-600" />
                  Jogos em Destaque
                </h2>
                <p className="text-gray-500 mt-2">Explore os títulos mais quentes de todas as plataformas.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                <span>{filteredGames.length} resultados encontrados</span>
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GameCard 
                        game={game} 
                        onAddToCart={() => handleAddToCart(game)} 
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum jogo encontrado</h3>
                <p className="text-gray-500">Tente buscar por outros termos ou plataformas.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedPlatform('Todas'); }}
                  className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o ConectaBrasil?</h2>
              <p className="text-gray-500">Tecnologia de ponta para garantir que cada transação seja perfeita.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verificação Rigorosa</h3>
                <p className="text-gray-500 leading-relaxed">
                  Exigimos CPF/CNPJ e documentos de todos os vendedores e clientes. Segurança em primeiro lugar.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Alcance Nacional</h3>
                <p className="text-gray-500 leading-relaxed">
                  Venda de qualquer lugar para qualquer região do Brasil. Logística integrada e segura.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Site Super Seguro</h3>
                <p className="text-gray-500 leading-relaxed">
                  Criptografia de ponta a ponta e conformidade total com a LGPD e leis brasileiras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seller CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Transforme seu negócio com o nosso Painel do Vendedor.
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Controle total de lucros, perdas e ganhos.</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Tabelas detalhadas de desempenho de vendas.</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span>Acesso restrito e seguro para profissionais.</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowAuth(true)}
                  className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Cadastrar como Vendedor
                </button>
              </div>
              <div className="relative z-10 w-full md:w-1/2">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-4 w-32 bg-white/10 rounded"></div>
                    <div className="h-8 w-8 bg-emerald-500/20 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-20 w-full bg-white/5 rounded-xl"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-white/5 rounded-xl"></div>
                      <div className="h-16 bg-white/5 rounded-xl"></div>
                      <div className="h-16 bg-white/5 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative circle */}
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}

      {showAuth && (
        <AuthForm 
          onClose={() => setShowAuth(false)} 
          onSuccess={(userData) => {
            setUser(userData);
            setShowAuth(false);
          }}
        />
      )}

      <AnimatePresence>
        {showCart && (
          <CartModal 
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            items={cart}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
            isProcessing={isCheckingOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
