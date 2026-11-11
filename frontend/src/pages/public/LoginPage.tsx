import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { VanLogoIcon } from '../../components/illustrations/VanLogoIcon';
import { AuditStampIllustration } from '../../components/illustrations/AuditStampIllustration';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  CheckCircle2,
  Sparkles,
  Shield,
  HelpCircle,
  Phone,
} from 'lucide-react';

interface LoginPageProps {
  setCurrentTab: (tab: string) => void;
  initialRole?: 'client' | 'provider';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  setCurrentTab,
  initialRole = 'client',
}) => {
  const { setRole, setCurrentUser } = useApp();
  const [selectedRole, setSelectedRole] = useState<'client' | 'provider'>(initialRole);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim()) {
      setErrorMsg('Por favor, informe seu e-mail ou WhatsApp.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setErrorMsg('Por favor, digite sua senha de acesso.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setRole(selectedRole);

      if (selectedRole === 'client') {
        setCurrentUser({
          id: 'usr-client-login',
          name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Passageiro VanBora',
          email: emailOrPhone.includes('@') ? emailOrPhone : 'contato@passageiro.com.br',
          phone: !emailOrPhone.includes('@') ? emailOrPhone : '(11) 98765-4321',
          role: 'client',
          clientType: 'PF',
          city: 'São Paulo - SP',
        });
        setCurrentTab('client-dashboard');
      } else {
        setCurrentUser({
          id: 'usr-prov-login',
          name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Motorista Parceiro',
          email: emailOrPhone.includes('@') ? emailOrPhone : 'motorista@vanbora.com.br',
          phone: !emailOrPhone.includes('@') ? emailOrPhone : '(11) 99123-8877',
          role: 'provider',
          providerStatus: 'APPROVED',
          city: 'São Paulo (Zona Leste / Grande SP)',
        });
        setCurrentTab('provider-dashboard');
      }
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'client' | 'provider' | 'admin') => {
    setRole(role);
    if (role === 'client') {
      setCurrentUser({
        id: 'usr-demo-client',
        name: 'Márcia Silveira (Família & Amigos)',
        email: 'marcia.silveira@gmail.com',
        phone: '(11) 98765-4321',
        role: 'client',
        clientType: 'PF',
        city: 'Penha - São Paulo (SP)',
      });
      setCurrentTab('client-dashboard');
    } else if (role === 'provider') {
      setCurrentUser({
        id: 'prov-demo-carlos',
        name: 'Carlos Eduardo Ramos (Seu Carlos)',
        email: 'carlos.ramos@transporteramos.com.br',
        phone: '(11) 99123-8877',
        role: 'provider',
        providerStatus: 'APPROVED',
        city: 'São Paulo (Zona Leste / Centro) - SP',
      });
      setCurrentTab('provider-dashboard');
    } else {
      setCurrentUser({
        id: 'adm-demo',
        name: 'Daniel Ramos (Auditoria)',
        email: 'compliance@vanbora.com.br',
        phone: '(11) 3100-5000',
        role: 'admin',
        city: 'São Paulo - SP',
      });
      setCurrentTab('admin-dashboard');
    }
  };

  const handleSendRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) return;
    setRecoverySent(true);
    setTimeout(() => {
      setRecoveryModalOpen(false);
      setRecoverySent(false);
      setRecoveryEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-[85vh] bg-brand-canvas py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Stamp */}
      <div className="absolute -top-10 -right-10 opacity-15 pointer-events-none hidden md:block">
        <AuditStampIllustration className="w-64 h-64" text="VANBORA SP" />
      </div>

      <div className="w-full max-w-lg space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div
            onClick={() => setCurrentTab('home')}
            className="inline-flex items-center gap-2.5 cursor-pointer group mb-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-ink flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <VanLogoIcon className="w-7 h-7 text-brand-yellow" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-brand-ink tracking-tight">
                Van<span className="text-brand-blue">Bora</span>
              </span>
              <p className="text-[11px] font-semibold text-brand-muted -mt-1">
                Vans para Passeios e Grupos
              </p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Bem-vindo(a) de volta!
          </h1>
          <p className="text-sm text-brand-muted max-w-sm mx-auto">
            Acesse sua conta para gerenciar seus passeios ou acompanhar suas viagens.
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-6 sm:p-8 shadow-towel space-y-6">
          {/* Dual Persona Switcher (Passageiro vs Motorista) */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-brand-muted text-center">
              Como você deseja entrar hoje?
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#EFECE4] p-1.5 rounded-2xl border border-brand-border">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('client');
                  setErrorMsg('');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                  selectedRole === 'client'
                    ? 'bg-brand-blue text-white shadow-sm scale-[1.02]'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>Sou Passageiro</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('provider');
                  setErrorMsg('');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                  selectedRole === 'provider'
                    ? 'bg-brand-ink text-white shadow-sm scale-[1.02]'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                <VanLogoIcon className="w-4 h-4 flex-shrink-0 text-brand-yellow" />
                <span>Sou Motorista</span>
              </button>
            </div>

            {/* Persona Helper Note */}
            <p className="text-[11px] text-center font-medium text-brand-muted pt-1">
              {selectedRole === 'client' ? (
                <>Para quem quer alugar van para família, passeios, amigos ou grupos.</>
              ) : (
                <>Para quem é dono de van e faz viagens e passeios na Grande SP.</>
              )}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email or WhatsApp */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-ink">
                E-mail ou WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={
                    selectedRole === 'client'
                      ? 'seuemail@gmail.com ou (11) 98765-4321'
                      : 'motorista@vanbora.com.br ou WhatsApp'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue transition-colors font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-brand-ink">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setRecoveryModalOpen(true)}
                  className="text-xs font-semibold text-brand-blue hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full pl-10 pr-11 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Ver senha"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-muted hover:text-brand-ink transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-brand-border text-brand-blue focus:ring-0"
                />
                <span className="text-xs font-medium text-brand-muted">
                  Manter conectado neste aparelho
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 text-white font-extrabold text-sm rounded-full shadow-towel transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 ${
                  selectedRole === 'client'
                    ? 'bg-brand-blue hover:bg-[#1d55cc]'
                    : 'bg-brand-ink hover:bg-[#253757]'
                }`}
              >
                {isLoading ? (
                  <span>Acessando conta...</span>
                ) : (
                  <>
                    <span>
                      Entrar como {selectedRole === 'client' ? 'Passageiro' : 'Motorista'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access (Perfeito para testes rápidos) */}
          <div className="pt-4 border-t border-brand-border space-y-3">
            <div className="flex items-center gap-2 justify-center text-xs font-bold text-brand-muted">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Acesso Rápido de Demonstração (1 Clique)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('client')}
                className="p-2.5 rounded-2xl bg-brand-canvas hover:bg-[#F2ECE1] border border-brand-border text-left transition-colors flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brand-ink truncate">Família Silveira</p>
                  <p className="text-[10px] text-brand-muted truncate">Perfil Passageiro Demo</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('provider')}
                className="p-2.5 rounded-2xl bg-brand-canvas hover:bg-[#F2ECE1] border border-brand-border text-left transition-colors flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-yellow/20 text-brand-ink flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  <VanLogoIcon className="w-4 h-4 text-amber-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brand-ink truncate">Seu Carlos (Sprinter)</p>
                  <p className="text-[10px] text-brand-muted truncate">Perfil Motorista Demo</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center space-y-3">
          <p className="text-xs sm:text-sm text-brand-muted">
            Ainda não tem cadastro no VanBora?{' '}
            <button
              onClick={() => setCurrentTab('register')}
              className="font-extrabold text-brand-blue hover:underline"
            >
              Cadastre-se grátis aqui
            </button>
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-brand-muted pt-2">
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="hover:text-brand-ink hover:underline"
            >
              Acesso da Auditoria / Admin
            </button>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-brand-green" />
              Ambiente 100% Protegido
            </span>
          </div>
        </div>
      </div>

      {/* Modal Esqueci Minha Senha */}
      {recoveryModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-ink/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-6 sm:p-8 max-w-md w-full shadow-towel space-y-4">
            <h3 className="text-lg font-bold text-brand-ink">
              Recuperar Acesso à Conta
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Informe seu e-mail ou WhatsApp cadastrado. Enviaremos um código seguro para você redefinir sua senha sem complicação.
            </p>

            {recoverySent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Link de recuperação enviado com sucesso! Verifique sua caixa de entrada ou WhatsApp.</span>
              </div>
            ) : (
              <form onSubmit={handleSendRecovery} className="space-y-4">
                <input
                  type="text"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="Seu e-mail ou WhatsApp"
                  required
                  className="w-full px-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink focus:outline-none focus:border-brand-blue"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecoveryModalOpen(false)}
                    className="px-4 py-2.5 rounded-full text-xs font-bold text-brand-muted hover:text-brand-ink"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-[#1d55cc]"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
