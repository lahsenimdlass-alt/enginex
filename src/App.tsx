import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PublishListingPage } from './pages/PublishListingPage';
import { SubscriptionSelectionPage } from './pages/SubscriptionSelectionPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

type Page =
  | 'home'
  | 'listings'
  | 'publish'
  | 'subscription-selection'
  | 'subscriptions'
  | 'my-listings'
  | 'dashboard'
  | 'admin'
  | 'profile'
  | 'notifications'
  | 'contact'
  | 'about'
  | 'terms'
  | 'login'
  | 'register'
  | 'listing-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<any>(null);

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page as Page);
    setPageParams(params || null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} filters={pageParams} />;
      case 'subscription-selection':
        return <SubscriptionSelectionPage onNavigate={handleNavigate} />;
      case 'publish':
        return <PublishListingPage onNavigate={handleNavigate} selectedPlan={pageParams?.selectedPlan} />;
      case 'subscriptions':
        return <SubscriptionsPage onNavigate={handleNavigate} />;
      case 'my-listings':
        return <MyListingsPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'listing-detail':
        return <ListingDetailPage listingId={pageParams?.id} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </AuthProvider>
  );
}

export default App;
