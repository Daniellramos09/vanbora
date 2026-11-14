import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { OfflineBanner } from './components/ui/OfflineBanner';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { CategoriesPage } from './pages/public/CategoriesPage';
import { ForProvidersPage } from './pages/public/ForProvidersPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ProvidersCatalogPage } from './pages/public/ProvidersCatalogPage';

// Client pages
import { ClientDashboard } from './pages/client/ClientDashboard';
import { NewRequestPage } from './pages/client/NewRequestPage';
import { ClientRequestsPage } from './pages/client/ClientRequestsPage';
import { ClientBookingsPage } from './pages/client/ClientBookingsPage';

// Provider pages
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { AvailableRequestsPage } from './pages/provider/AvailableRequestsPage';
import { ProviderProposalsPage } from './pages/provider/ProviderProposalsPage';
import { ProviderVehiclesPage } from './pages/provider/ProviderVehiclesPage';
import { ProviderDocumentsPage } from './pages/provider/ProviderDocumentsPage';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminDocumentsPage } from './pages/admin/AdminDocumentsPage';
import { AdminProvidersPage } from './pages/admin/AdminProvidersPage';

const MainContent: React.FC = () => {
  const { currentRole } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      // Public views
      case 'home':
        return <HomePage setCurrentTab={setCurrentTab} />;
      case 'how-it-works':
        return <HowItWorksPage setCurrentTab={setCurrentTab} />;
      case 'categories':
        return <CategoriesPage setCurrentTab={setCurrentTab} />;
      case 'for-providers':
        return <ForProvidersPage setCurrentTab={setCurrentTab} />;
      case 'providers-catalog':
        return <ProvidersCatalogPage setCurrentTab={setCurrentTab} />;
      case 'login':
        return <LoginPage setCurrentTab={setCurrentTab} />;
      case 'register':
        return <RegisterPage setCurrentTab={setCurrentTab} />;

      // Client views
      case 'client-dashboard':
        return <ClientDashboard setCurrentTab={setCurrentTab} />;
      case 'new-request':
        return <NewRequestPage setCurrentTab={setCurrentTab} />;
      case 'client-requests':
        return <ClientRequestsPage setCurrentTab={setCurrentTab} />;
      case 'client-bookings':
        return <ClientBookingsPage setCurrentTab={setCurrentTab} />;

      // Provider views
      case 'provider-dashboard':
        return <ProviderDashboard setCurrentTab={setCurrentTab} />;
      case 'provider-requests':
        return <AvailableRequestsPage setCurrentTab={setCurrentTab} />;
      case 'provider-proposals':
        return <ProviderProposalsPage setCurrentTab={setCurrentTab} />;
      case 'provider-vehicles':
        return <ProviderVehiclesPage />;
      case 'provider-documents':
        return <ProviderDocumentsPage />;

      // Admin views
      case 'admin-dashboard':
        return <AdminDashboard setCurrentTab={setCurrentTab} />;
      case 'admin-documents':
        return <AdminDocumentsPage />;
      case 'admin-providers':
        return <AdminProvidersPage />;
      case 'admin-requests':
        return <ClientRequestsPage setCurrentTab={setCurrentTab} />;

      default:
        return <HomePage setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <OfflineBanner />
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1">
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <MainContent />
      </ToastProvider>
    </AppProvider>
  );
}
