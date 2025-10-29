import { ReactNode } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Logo } from './Logo';

type LayoutProps = {
  children: ReactNode;
  currentPage?: string;
  onNavigate: (page: string) => void;
};

export function Layout({ children, currentPage = 'home', onNavigate }: LayoutProps) {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'listings', label: 'Annonces' },
    { id: 'subscription-selection', label: 'Publier une annonce', highlight: true },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'À propos' },
    ...(user ? [
      { id: 'dashboard', label: 'Tableau de bord' },
      { id: 'my-listings', label: 'Mes annonces' }
    ] : []),
    ...(user && profile?.is_admin ? [
      { id: 'admin', label: '⚙️ Admin', adminOnly: true }
    ] : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo onClick={() => onNavigate('home')} />

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.highlight
                      ? 'bg-[#156D3E] text-white hover:bg-[#0f5630]'
                      : currentPage === item.id
                      ? 'bg-gray-100 text-[#156D3E]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-md">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.full_name}
                    </span>
                    {profile?.account_type === 'pro' && (
                      <span className="px-2 py-0.5 bg-[#156D3E] text-white text-xs font-semibold rounded">
                        PRO
                      </span>
                    )}
                    {profile?.account_type === 'premium' && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-semibold rounded">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-600 hover:text-[#156D3E] hover:bg-gray-100 rounded-md transition-colors"
                    title="Déconnexion"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#156D3E] transition-colors"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => onNavigate('register')}
                    className="px-4 py-2 bg-[#156D3E] text-white text-sm font-medium rounded-md hover:bg-[#0f5630] transition-colors"
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 text-left rounded-md text-sm font-medium transition-colors ${
                      item.highlight
                        ? 'bg-[#156D3E] text-white'
                        : currentPage === item.id
                        ? 'bg-gray-100 text-[#156D3E]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('login');
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('register');
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 bg-[#156D3E] text-white text-sm font-medium rounded-md"
                    >
                      S'inscrire
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" className="[&_circle]:fill-white [&_path]:stroke-[#156D3E] [&_rect]:fill-[#156D3E] [&_.text-\\[\\#156D3E\\]]:text-white [&_.text-gray-600]:text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">
                La plateforme marocaine de référence pour la vente et l'achat d'engins agricoles et BTP.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('listings')} className="text-gray-400 hover:text-white transition-colors">
                    Annonces
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('subscription-selection')} className="text-gray-400 hover:text-white transition-colors">
                    Publier une annonce
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('subscriptions')} className="text-gray-400 hover:text-white transition-colors">
                    Abonnements PRO
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Informations</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('blog')} className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 +212 6XX XXX XXX</li>
                <li>📧 contact@enginex.ma</li>
                <li>📍 Casablanca, Maroc</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Enginex. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
