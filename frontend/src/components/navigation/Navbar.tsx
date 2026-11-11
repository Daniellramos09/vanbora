import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Menu,
  X,
  Truck,
  ChevronRight,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { currentRole, setRole, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string }[] = [
    { role: 'visitor', label: 'Visitante' },
    { role: 'client', label: 'Cliente' },
    { role: 'provider', label: 'Prestador' },
    { role: 'admin', label: 'Admin' },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'visitor') setCurrentTab('home');
    else if (newRole === 'client') setCurrentTab('client-dashboard');
    else if (newRole === 'provider') setCurrentTab('provider-dashboard');
    else if (newRole === 'admin') setCurrentTab('admin-dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-canvas/95 backdrop-blur-md border-b border-brand-border">
      {/* Top Testing Utility Bar with Slite-style Pill Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between border-b border-brand-border/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="font-semibold text-brand-muted text-[11px]">
            Rede Ativa · Grande São Paulo
          </span>
        </div>

        {/* Minimalist Pill Switcher */}
        <div className="flex items-center gap-1 bg-[#EFECE4] p-1 rounded-full border border-brand-border">
          <span className="text-[10px] text-brand-muted font-bold px-2 hidden sm:inline">Perfil:</span>
          {roles.map((r) => {
            const isActive = currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-ink text-white shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Brand Navigation Bar (Skeelo & Slite aesthetic) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Character Icon */}
          <div
            onClick={() => handleRoleSelect(currentRole === 'visitor' ? 'visitor' : currentRole)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-ink border-2 border-brand-ink flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 text-brand-yellow" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-brand-ink">
                Van<span className="text-brand-blue">Bora</span>
              </span>
              <p className="text-[11px] font-semibold text-brand-muted -mt-1 hidden sm:block">
                Transporte Coletivo & Fretamento
              </p>
            </div>
          </div>

          {/* Navigation Links (No generic buttons, Slite-inspired tabs) */}
          <nav className="hidden md:flex items-center gap-2">
            {currentRole === 'visitor' && (
              <>
                <button
                  onClick={() => setCurrentTab('home')}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    currentTab === 'home'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Visão Geral
                </button>
                <button
                  onClick={() => setCurrentTab('how-it-works')}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    currentTab === 'how-it-works'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Como Funciona
                </button>
                <button
                  onClick={() => setCurrentTab('categories')}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    currentTab === 'categories'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Categorias
                </button>
                <button
                  onClick={() => setCurrentTab('for-providers')}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    currentTab === 'for-providers'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Para Motoristas
                </button>
              </>
            )}

            {currentRole === 'client' && (
              <>
                <button
                  onClick={() => setCurrentTab('client-dashboard')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'client-dashboard'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Minhas Viagens
                </button>
                <button
                  onClick={() => setCurrentTab('new-request')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'new-request'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-brand-blue bg-brand-blue-soft/80 hover:bg-brand-blue-soft'
                  }`}
                >
                  + Nova Solicitação
                </button>
                <button
                  onClick={() => setCurrentTab('client-requests')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'client-requests'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Propostas Recebidas
                </button>
                <button
                  onClick={() => setCurrentTab('client-bookings')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'client-bookings'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Contratos Ativos
                </button>
              </>
            )}

            {currentRole === 'provider' && (
              <>
                <button
                  onClick={() => setCurrentTab('provider-dashboard')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'provider-dashboard'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Radar de Viagens
                </button>
                <button
                  onClick={() => setCurrentTab('provider-requests')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'provider-requests'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Solicitações Abertas
                </button>
                <button
                  onClick={() => setCurrentTab('provider-vehicles')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'provider-vehicles'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Minhas Vans
                </button>
                <button
                  onClick={() => setCurrentTab('provider-documents')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'provider-documents'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Certidões & Vistoria
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => setCurrentTab('admin-dashboard')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'admin-dashboard'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Supervisão Geral
                </button>
                <button
                  onClick={() => setCurrentTab('admin-documents')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'admin-documents'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Fila de Auditoria
                </button>
                <button
                  onClick={() => setCurrentTab('admin-providers')}
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    currentTab === 'admin-providers'
                      ? 'bg-brand-surface text-brand-ink shadow-sm border border-brand-border'
                      : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  Frotas & Prestadores
                </button>
              </>
            )}
          </nav>

          {/* Action Button (Skeelo comfortable touch target) */}
          <div className="hidden md:flex items-center gap-3">
            {currentRole === 'visitor' ? (
              <button
                onClick={() => {
                  handleRoleSelect('client');
                  setCurrentTab('new-request');
                }}
                className="px-6 py-3 bg-brand-blue hover:bg-[#1e54cc] text-white font-extrabold text-sm rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Solicitar Transporte
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-3 border-l border-brand-border">
                <div className="w-8 h-8 rounded-full bg-brand-ink text-white font-bold flex items-center justify-center text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-brand-ink leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-brand-muted">
                    {currentRole === 'client' ? 'Contratante' : currentRole === 'provider' ? 'Motorista' : 'Auditor'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
              className="p-2 rounded-xl text-brand-ink hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-surface px-4 pt-3 pb-6 space-y-3">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">Navegação</p>
          {currentRole === 'visitor' && (
            <div className="space-y-1">
              <button
                onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-brand-ink hover:bg-black/5 flex items-center justify-between"
              >
                <span>Visão Geral</span>
                <ChevronRight className="w-4 h-4 text-brand-muted" />
              </button>
              <button
                onClick={() => { setCurrentTab('how-it-works'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-brand-ink hover:bg-black/5 flex items-center justify-between"
              >
                <span>Como Funciona</span>
                <ChevronRight className="w-4 h-4 text-brand-muted" />
              </button>
              <button
                onClick={() => { setCurrentTab('categories'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-brand-ink hover:bg-black/5 flex items-center justify-between"
              >
                <span>Categorias de Vans</span>
                <ChevronRight className="w-4 h-4 text-brand-muted" />
              </button>
              <button
                onClick={() => { setCurrentTab('for-providers'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-brand-ink hover:bg-black/5 flex items-center justify-between"
              >
                <span>Para Motoristas e Frotistas</span>
                <ChevronRight className="w-4 h-4 text-brand-muted" />
              </button>
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleRoleSelect('client');
                    setCurrentTab('new-request');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-brand-blue text-white font-bold text-sm rounded-full text-center"
                >
                  Solicitar Transporte Agora
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
