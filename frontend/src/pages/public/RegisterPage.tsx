import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { VanBoraApi } from '../../services/apiClient';
import { VanLogoIcon } from '../../components/illustrations/VanLogoIcon';
import { AuditStampIllustration } from '../../components/illustrations/AuditStampIllustration';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  Heart,
  Smile,
  MapPin,
  Lock,
  Mail,
  Phone,
  User,
  Building2,
  Calendar,
  Sparkles,
  HelpCircle,
  Car,
} from 'lucide-react';

interface RegisterPageProps {
  setCurrentTab: (tab: string) => void;
  initialRole?: 'client' | 'provider';
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  setCurrentTab,
  initialRole = 'client',
}) => {
  const { setRole, setCurrentUser } = useApp();
  const toast = useToast();
  const [roleType, setRoleType] = useState<'client' | 'provider'>(initialRole);

  // Common Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('São Paulo - SP');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Client Specific States
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [companyName, setCompanyName] = useState('');

  // Provider Specific States
  const [vanModel, setVanModel] = useState('Mercedes-Benz Sprinter');
  const [vanCapacity, setVanCapacity] = useState('19');
  const [hasCnhEar, setHasCnhEar] = useState(true);
  const [primaryRegion, setPrimaryRegion] = useState('Zona Leste (Capital)');

  // Submission Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successRegistered, setSuccessRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor, informe um e-mail válido.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor, informe seu WhatsApp para receber os contatos da viagem.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('É necessário concordar com os Termos de Uso e Política de Privacidade.');
      return;
    }

    setIsLoading(true);

    // Call real Spring Boot backend API with automatic fallback
    const backendPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      role: roleType === 'client' ? 'ROLE_CLIENT' : 'ROLE_PROVIDER',
      clientType: roleType === 'client' ? clientType : null,
      companyName: roleType === 'client' && clientType === 'PJ' ? companyName : null,
      city,
      nickname: roleType === 'provider' ? name.split(' ')[0] : null,
      vanModel: roleType === 'provider' ? vanModel : null,
      vanCapacity: roleType === 'provider' ? parseInt(vanCapacity, 10) : null,
      hasCnhEar: roleType === 'provider' ? hasCnhEar : null,
      baseRegion: roleType === 'provider' ? primaryRegion : null,
    };

    VanBoraApi.register(backendPayload).then((res) => {
      setIsLoading(false);

      if (res.error && !res.isFallback) {
        setErrorMsg(res.error);
        toast.error('Falha no Cadastro', res.error);
        return;
      }

      setSuccessRegistered(true);
      setRole(roleType);

      if (res.isFallback) {
        toast.info('Modo Demonstração Ativo', 'Cadastro realizado localmente em memória.');
      } else {
        toast.success('Conta Criada com Sucesso!', 'Seus dados foram salvos com segurança no PostgreSQL.');
      }

      if (roleType === 'client') {
        setCurrentUser({
          id: res.data?.token ? `usr-${Date.now().toString().slice(-4)}` : `usr-${Date.now().toString().slice(-4)}`,
          name,
          email,
          phone,
          role: 'client',
          clientType,
          companyName: clientType === 'PJ' ? companyName : undefined,
          city,
        });

        setTimeout(() => {
          setCurrentTab('new-request');
        }, 1200);
      } else {
        setCurrentUser({
          id: `prov-${Date.now().toString().slice(-4)}`,
          name,
          email,
          phone,
          role: 'provider',
          providerStatus: 'UNDER_REVIEW',
          city: `${city} (${primaryRegion})`,
        });

        setTimeout(() => {
          setCurrentTab('provider-dashboard');
        }, 1200);
      }
    });
  };

  return (
    <div className="min-h-[85vh] bg-brand-canvas py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Stamp */}
      <div className="absolute -top-12 -left-12 opacity-15 pointer-events-none hidden md:block">
        <AuditStampIllustration className="w-64 h-64" text="CADASTRO SP" />
      </div>

      <div className="w-full max-w-2xl space-y-8 relative z-10">
        {/* Header */}
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

          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Crie sua conta no VanBora
          </h1>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Escolha como você quer usar o VanBora e junte-se à nossa comunidade de viagens seguras e passeios tranquilos.
          </p>
        </div>

        {/* Success Message Banner */}
        {successRegistered ? (
          <div className="bg-brand-surface rounded-3xl border-2 border-brand-green p-8 shadow-towel text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mx-auto font-black text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-brand-ink">
              Cadastro criado com sucesso!
            </h2>
            <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
              {roleType === 'client'
                ? 'Seja bem-vindo(a)! Estamos preparando o painel para você planejar seu passeio ou viagem em grupo...'
                : 'Parabéns, parceiro(a)! Sua conta de motorista está pronta. Vamos te direcionar para o radar de viagens da Grande SP...'}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-blue pt-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
              <span>Redirecionando em instantes...</span>
            </div>
          </div>
        ) : (
          /* Main Card */
          <div className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-6 sm:p-10 shadow-towel space-y-8">
            {/* Step 1: Big Visual Persona Choice */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-ink text-center">
                1. Qual é o seu objetivo principal?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Passenger / Client */}
                <div
                  onClick={() => {
                    setRoleType('client');
                    setErrorMsg('');
                  }}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    roleType === 'client'
                      ? 'border-brand-blue bg-[#F0F5FF] shadow-sm ring-2 ring-brand-blue/20'
                      : 'border-brand-border bg-brand-canvas hover:border-brand-border-strong'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-brand-ink">
                        Quero Viajar / Passear
                      </h3>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        Para famílias, amigos, colégios ou empresas que precisam alugar van com motorista.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 mt-4 space-y-1 text-[11px] text-brand-muted font-medium">
                    <p>✓ Preço justo já calculado pelo site</p>
                    <p>✓ Todo mundo junto sem dividir Uber</p>
                  </div>

                  {roleType === 'client' && (
                    <div className="absolute top-4 right-4 text-brand-blue">
                      <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                    </div>
                  )}
                </div>

                {/* Option 2: Driver / Provider */}
                <div
                  onClick={() => {
                    setRoleType('provider');
                    setErrorMsg('');
                  }}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    roleType === 'provider'
                      ? 'border-brand-ink bg-[#FFF9ED] shadow-sm ring-2 ring-brand-yellow/30'
                      : 'border-brand-border bg-brand-canvas hover:border-brand-border-strong'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-brand-ink text-brand-yellow flex items-center justify-center">
                      <VanLogoIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-brand-ink">
                        Tenho Van Própria
                      </h3>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        Para motoristas de vans que querem fazer viagens e arrumar uma graninha extra no sábado e domingo.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 mt-4 space-y-1 text-[11px] text-brand-muted font-medium">
                    <p>✓ Você escolhe quando rodar</p>
                    <p>✓ Sem dor de cabeça de negociação</p>
                  </div>

                  {roleType === 'provider' && (
                    <div className="absolute top-4 right-4 text-brand-ink">
                      <CheckCircle2 className="w-5 h-5 fill-current text-brand-yellow" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-2">
              <div className="border-t border-brand-border pt-6 space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-brand-ink">
                  2. Dados de Acesso e Contato
                </p>

                {errorMsg && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Client Subtype Switcher (PF vs PJ) */}
                {roleType === 'client' && (
                  <div className="flex items-center gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() => setClientType('PF')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        clientType === 'PF'
                          ? 'bg-brand-ink text-white'
                          : 'bg-brand-canvas text-brand-muted hover:text-brand-ink border border-brand-border'
                      }`}
                    >
                      Pessoa Física (Família / Amigos)
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType('PJ')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        clientType === 'PJ'
                          ? 'bg-brand-ink text-white'
                          : 'bg-brand-canvas text-brand-muted hover:text-brand-ink border border-brand-border'
                      }`}
                    >
                      Empresa / Instituição / Escola
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      {roleType === 'client'
                        ? clientType === 'PJ'
                          ? 'Nome do Responsável'
                          : 'Seu Nome Completo'
                        : 'Seu Nome / Como te chamam (ex: Carlos da Van)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo ou Márcia"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>

                  {/* Company Name if PJ */}
                  {roleType === 'client' && clientType === 'PJ' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-brand-ink">
                        Razão Social ou Nome Fantasia
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ex: Colégio Santos Dumont Ltda"
                          className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      WhatsApp com DDD
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      E-mail de Contato
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>

                  {/* City / Base Region */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      {roleType === 'client' ? 'Cidade / Bairro Principal' : 'Bairro / Base da Van'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: Penha - São Paulo (SP)"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Specific Provider Van Details */}
                {roleType === 'provider' && (
                  <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-brand-border space-y-4">
                    <p className="text-xs font-bold text-brand-ink flex items-center gap-1.5">
                      <VanLogoIcon className="w-4 h-4 text-brand-yellow" />
                      <span>Detalhes da sua Van e Habilitação</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-brand-ink mb-1">
                          Modelo do Veículo
                        </label>
                        <select
                          value={vanModel}
                          onChange={(e) => setVanModel(e.target.value)}
                          className="w-full p-2.5 bg-white rounded-xl border border-brand-border text-brand-ink focus:outline-none focus:border-brand-blue font-medium"
                        >
                          <option value="Mercedes-Benz Sprinter">Mercedes-Benz Sprinter</option>
                          <option value="Renault Master Minibus">Renault Master Minibus</option>
                          <option value="Ford Transit Passageiros">Ford Transit</option>
                          <option value="Fiat Ducato Minibus">Fiat Ducato</option>
                          <option value="Iveco Daily Minibus">Iveco Daily</option>
                          <option value="Outro Modelo">Outro Modelo</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-brand-ink mb-1">
                          Capacidade de Passageiros
                        </label>
                        <select
                          value={vanCapacity}
                          onChange={(e) => setVanCapacity(e.target.value)}
                          className="w-full p-2.5 bg-white rounded-xl border border-brand-border text-brand-ink focus:outline-none focus:border-brand-blue font-medium"
                        >
                          <option value="15">15 Lugares (+ Motorista)</option>
                          <option value="16">16 Lugares (+ Motorista)</option>
                          <option value="19">19 Lugares (+ Motorista)</option>
                          <option value="21">21 Lugares (+ Motorista)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasCnhEar}
                          onChange={(e) => setHasCnhEar(e.target.checked)}
                          className="w-4 h-4 rounded border-brand-border text-brand-green focus:ring-0"
                        />
                        <span className="text-xs font-semibold text-brand-ink">
                          Possuo CNH D com observação EAR e documento do veículo em dia (CRLV)
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      Criar Senha de Acesso
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 dígitos"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-ink">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita a mesma senha"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-brand-canvas rounded-2xl border border-brand-border text-sm text-brand-ink focus:outline-none focus:border-brand-blue font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-brand-border text-brand-blue focus:ring-0 flex-shrink-0"
                    />
                    <span className="text-xs text-brand-muted leading-relaxed">
                      Concordo com os Termos de Uso do VanBora e confirmo estar ciente de que as viagens são acordadas diretamente com motoristas independentes e habilitados.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 text-white font-extrabold text-base rounded-full shadow-towel transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2.5 ${
                    roleType === 'client'
                      ? 'bg-brand-blue hover:bg-[#1d55cc]'
                      : 'bg-brand-ink hover:bg-[#253757]'
                  }`}
                >
                  {isLoading ? (
                    <span>Criando sua conta...</span>
                  ) : (
                    <>
                      <span>
                        Finalizar Cadastro como {roleType === 'client' ? 'Passageiro' : 'Motorista'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer Link to Login */}
        <div className="text-center space-y-2">
          <p className="text-xs sm:text-sm text-brand-muted">
            Já tem uma conta no VanBora?{' '}
            <button
              onClick={() => setCurrentTab('login')}
              className="font-extrabold text-brand-blue hover:underline"
            >
              Fazer login aqui
            </button>
          </p>

          <p className="text-[11px] text-brand-muted/80">
            Privacidade garantida conforme a LGPD. Não enviamos mensagens indesejadas.
          </p>
        </div>
      </div>
    </div>
  );
};
