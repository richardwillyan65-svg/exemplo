import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole, UserProfile } from '../types';
import { X, ShieldCheck, AlertCircle, User } from 'lucide-react';

interface AuthFormProps {
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (userDoc.exists()) {
          onSuccess(userDoc.data() as UserProfile);
        } else {
          throw new Error('Perfil não encontrado.');
        }
      } else {
        if (!documentId) throw new Error('Documento (CPF/CNPJ) é obrigatório.');
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData: UserProfile = {
          uid: userCredential.user.uid,
          email,
          displayName,
          role,
          documentId,
          createdAt: serverTimestamp(),
        };
        
        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        onSuccess(userData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-emerald-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta segura'}
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF ou CNPJ (Segurança)</label>
                  <input
                    type="text"
                    required
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      role === 'customer' 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    <User size={24} />
                    <span className="text-xs font-bold uppercase">Cliente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      role === 'seller' 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    <ShieldCheck size={24} />
                    <span className="text-xs font-bold uppercase">Vendedor</span>
                  </button>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-md mt-2"
            >
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar Agora'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-emerald-600 hover:underline"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
