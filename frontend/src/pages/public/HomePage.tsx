import React from 'react';
import { useApp } from '../../context/AppContext';
import { VanWithDriverIllustration } from '../../components/illustrations/VanWithDriverIllustration';
import { CityHorizonIllustration } from '../../components/illustrations/CityHorizonIllustration';
import { BoardingPassCard } from '../../components/ui/BoardingPassCard';
import { DoodleArrow } from '../../components/illustrations/DoodleArrow';
import { AuditStampIllustration } from '../../components/illustrations/AuditStampIllustration';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Calendar,
  Compass,
  FileCheck,
  MapPin,
} from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab }) => {
  const { setRole } = useApp();

  const handleStartRequest = () => {
    setRole('client');
    setCurrentTab('new-request');
  };

  const handleJoinProvider = () => {
    setRole('provider');
    setCurrentTab('provider-dashboard');
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-brand-canvas">
      {/* 1. Hero Section: Layered Narrative & Character-Led Moving Van */}
      <section className="relative pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Editorial Voice */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.12]">
              Sua van certa em São Paulo, sem a facada das grandes transportadoras.
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Conectamos empresas, colégios e famílias diretamente a proprietários de vans e frotistas legalizados na Grande SP. Orçamentos competitivos, motoristas com CNH EAR e seguro de passageiros em cada viagem.
            </p>

            {/* Action Group with Doodle Arrow */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 relative">
              <button
                onClick={handleStartRequest}
                className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-base rounded-full shadow-towel transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span>Solicitar Cotação de Transporte</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleJoinProvider}
                className="w-full sm:w-auto px-6 py-4 bg-brand-surface hover:bg-[#F2ECE1] text-brand-ink font-bold text-sm rounded-full border-2 border-brand-border-strong transition-colors"
              >
                Sou Motorista e quero viagens
              </button>

              {/* Armadillo-style Doodle Arrow pointing to primary CTA (desktop only) */}
              <div className="hidden xl:block absolute -bottom-12 left-64 pointer-events-none">
                <DoodleArrow className="w-14 h-10 text-brand-yellow" />
                <span className="text-[11px] font-bold text-brand-muted -ml-2">100% gratuito</span>
              </div>
            </div>

            {/* Micro-guarantees (Refined typography, no repetitive cards) */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-brand-border text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-ink">100%</p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">Vans com vistoria e CRLV em dia</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-green">Seguro APP</p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">Cobertura obrigatória de passageiros</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-yellow">Zero Gimmick</p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">Negociação direta com quem dirige</p>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Van & Driver Scene */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full relative">
              <VanWithDriverIllustration className="w-full max-w-[440px] mx-auto drop-shadow-md" />
              
              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 sm:bottom-0 right-4 sm:right-6 bg-brand-surface border-2 border-brand-border-strong rounded-2xl p-3 shadow-towel flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-ink">Motorista Regular</p>
                  <p className="text-[10px] text-brand-muted">CNH D com EAR Ativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Panoramic Layered Cityscape Transition (Allwhere Inspired) */}
      <section className="relative w-full border-y border-brand-border bg-[#F5F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center sm:text-left flex items-center justify-between">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Cobertura Metropolitana Ativa
          </p>
          <p className="text-xs font-medium text-brand-muted hidden sm:block">
            Capital · Guarulhos (GRU) · ABC Paulista · Osasco · Destinos Turísticos
          </p>
        </div>
        <CityHorizonIllustration className="w-full h-28 sm:h-36 object-cover" />
      </section>

      {/* 3. The Proof Section: Real Case Study Boarding Pass (Slite + Armadillo) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            A matemática real de quem contrata com a VanBora.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Uma empresa de tecnologia na Bela Vista precisava transportar seus colaboradores até o Aeroporto de Guarulhos. Veja a diferença entre a cotação tradicional e a contratação na nossa rede:
          </p>
        </div>

        <BoardingPassCard
          origin="Av. Paulista, 1000 - Bela Vista, São Paulo"
          destination="Aeroporto Internacional de Guarulhos (GRU) - Terminal 3"
          date="Seg a Sex (08h às 17h) e Sáb (09h às 12h)"
          passengers={15}
          vehicleModel="Mercedes-Benz Sprinter 516 Executiva"
          driverName="Carlos Eduardo Ramos"
          fairPrice={19800}
          traditionalQuotePrice={24000}
          onSelect={handleStartRequest}
        />
      </section>

      {/* 4. A Viagem em Fita Contínua (Sem 3 caixinhas separadas) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Do primeiro ponto até o destino, tudo orquestrado.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Esqueça trocas intermináveis de mensagens no WhatsApp sem saber se o veículo vai aparecer.
          </p>
        </div>

        <div className="relative bg-brand-surface rounded-4xl border-2 border-brand-border-strong p-8 sm:p-12 shadow-towel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ink text-white font-black text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-bold text-brand-ink">
                Defina o trajeto e os embarques
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Adicione paradas no Metrô Tatuapé, Barra Funda ou em qualquer endereço intermediário. A plataforma calcula o tempo e a quilometragem justa.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow text-brand-ink font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-bold text-brand-ink">
                Receba orçamentos de quem tem van livre
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Motoristas autônomos que estão com horários ociosos na sua região enviam propostas competitivas com fotos do veículo e condições claras.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-green text-white font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-bold text-brand-ink">
                Feche com Seguro APP garantido
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Você compara veículo, capacidade e avaliações. O contrato é emitido com placa do veículo, motorista qualificado e cobertura de seguro para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Categorias Regulamentadas na Grande SP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Vans preparadas para cada tipo de missão
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Não colocamos qualquer veículo para qualquer serviço. Cada categoria exige uma autorização legal correspondente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-brand-surface rounded-3xl border border-brand-border-strong space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue-soft text-brand-blue flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-ink">Corporativo e Turnos</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Transporte contínuo de equipes entre estações, polos industriais e sedes corporativas na capital e Grande SP.
            </p>
          </div>

          <div className="p-6 bg-brand-surface rounded-3xl border border-brand-border-strong space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-brand-green-soft text-brand-green flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-ink">Eventos e Feiras</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Equipes técnicas e participantes para congressos no Expo Center Norte, Anhembi, Transamérica e casamentos.
            </p>
          </div>

          <div className="p-6 bg-brand-surface rounded-3xl border border-brand-border-strong space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow-light text-amber-800 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-ink">Excursões e Lazer</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Viagens particulares em família para São Roque (Rota do Vinho), Aparecida, litoral ou traslados aeroportuários.
            </p>
          </div>

          <div className="p-6 bg-brand-surface rounded-3xl border border-brand-border-strong space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-ink">Escolar & Pedagógico</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Passeios pedagógicos conduzidos exclusivamente por vans com alvará escolar DTP ativo e monitor registrado.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Compromisso com a Lei e Segurança (Armadillo-style stamp section) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-4xl border-2 border-brand-border-strong p-8 sm:p-12 shadow-towel relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                Transporte de pessoas não admite amadorismo.
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Toda van cadastrada passa por auditoria prévia. Conferimos a CNH categoria D com menção EAR, o CRLV em categoria aluguel, o laudo semestral de vistoria veicular e a apólice de Seguro APP para cada assento ocupado.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-canvas text-brand-ink font-bold text-xs border border-brand-border">
                  <ShieldCheck className="w-4 h-4 text-brand-green" /> CNH D com EAR
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-canvas text-brand-ink font-bold text-xs border border-brand-border">
                  <ShieldCheck className="w-4 h-4 text-brand-green" /> CRLV Aluguel Regular
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-canvas text-brand-ink font-bold text-xs border border-brand-border">
                  <ShieldCheck className="w-4 h-4 text-brand-green" /> Seguro APP Obrigatório
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <AuditStampIllustration className="w-36 h-36" text="AUDITADO SP" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Skeelo-style Warm Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
          Bora encontrar a van certa para o seu grupo?
        </h2>
        <p className="text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
          Sem burocracia e sem compromisso. Preencha seu itinerário e receba propostas de motoristas avaliados na Grande São Paulo.
        </p>
        <div className="pt-2">
          <button
            onClick={handleStartRequest}
            className="px-10 py-5 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-lg rounded-full shadow-towel hover:scale-105 active:scale-95 transition-all"
          >
            Começar Cotação Gratuita
          </button>
        </div>
      </section>
    </div>
  );
};
