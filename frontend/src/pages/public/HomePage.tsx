import React, { useState } from 'react';
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
  Users,
  Heart,
  Smile,
  Compass,
  Calendar,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab }) => {
  const { setRole } = useApp();
  const [activeExampleTab, setActiveExampleTab] = useState<'familia' | 'criancas' | 'aeroporto'>('familia');

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
      {/* 1. Hero Section: Peaceful, Friendly, Human */}
      <section className="relative pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Peaceful & Welcoming Tone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.14]">
              Junte a turma e vá de van. Direto com motoristas da sua confiança.
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Precisa levar as crianças para um aniversário, reunir a família para um sítio no sábado ou levar os amigos para o aeroporto? Conectamos você diretamente a motoristas autônomos de vans em São Paulo — pessoas acolhedoras, preço combinado direto e todo mundo viajando junto com tranquilidade.
            </p>

            {/* Action Group with Doodle Arrow */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 relative">
              <button
                onClick={handleStartRequest}
                className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-base rounded-full shadow-towel transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span>Encontrar uma Van para Meu Grupo</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleJoinProvider}
                className="w-full sm:w-auto px-6 py-4 bg-brand-surface hover:bg-[#F2ECE1] text-brand-ink font-bold text-sm rounded-full border-2 border-brand-border-strong transition-colors"
              >
                Tenho Van e quero fazer viagens no fim de semana
              </button>

              {/* Hand-drawn Doodle Arrow */}
              <div className="hidden xl:block absolute -bottom-12 left-72 pointer-events-none">
                <DoodleArrow className="w-14 h-10 text-brand-yellow" />
                <span className="text-[11px] font-bold text-brand-muted -ml-1">Sem custo para pedir</span>
              </div>
            </div>

            {/* Micro-values: Everyday Warmth */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-brand-border text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-ink flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-brand-blue" />
                  <span>Juntos</span>
                </p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">
                  Todo mundo no mesmo veículo, sem dividir Ubers
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-green flex items-center gap-1.5">
                  <Heart className="w-5 h-5 text-brand-green" />
                  <span>Cuidado</span>
                </p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">
                  Motoristas acostumados com crianças e famílias
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-yellow flex items-center gap-1.5">
                  <Smile className="w-5 h-5 text-brand-yellow" />
                  <span>Direto</span>
                </p>
                <p className="text-xs font-medium text-brand-muted mt-0.5">
                  Valor justo combinado sem intermediários chatos
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Van & Driver Scene */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full relative">
              <VanWithDriverIllustration className="w-full max-w-[440px] mx-auto drop-shadow-md" />
              
              {/* Floating Friendly Driver Badge */}
              <div className="absolute -bottom-3 sm:bottom-0 right-4 sm:right-6 bg-brand-surface border-2 border-brand-border-strong rounded-2xl p-3 shadow-towel flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-ink">Motorista Amigo</p>
                  <p className="text-[10px] text-brand-muted">Van limpinha e revisada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Panoramic Layered Cityscape Transition */}
      <section className="relative w-full border-y border-brand-border bg-[#F5F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center sm:text-left flex items-center justify-between">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Rotas do Dia a Dia em Toda a Grande São Paulo
          </p>
          <p className="text-xs font-medium text-brand-muted hidden sm:block">
            Bairros da Capital · Passeios no Interior · Sítios · Festas e Aeroportos
          </p>
        </div>
        <CityHorizonIllustration className="w-full h-28 sm:h-36 object-cover" />
      </section>

      {/* 3. Everyday Simple Trips (Passeios e Rotas da Vida Real) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Veja como é simples organizar uma viagem em grupo
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Exemplos reais de trajetos que famílias e grupos contratam nos fins de semana e feriados:
          </p>

          {/* Route Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveExampleTab('familia')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeExampleTab === 'familia'
                  ? 'bg-brand-ink text-white shadow-sm'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-ink border border-brand-border'
              }`}
            >
              🌿 Sítio no Sábado (Família)
            </button>
            <button
              onClick={() => setActiveExampleTab('criancas')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeExampleTab === 'criancas'
                  ? 'bg-brand-ink text-white shadow-sm'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-ink border border-brand-border'
              }`}
            >
              🎈 Crianças / Aniversário
            </button>
            <button
              onClick={() => setActiveExampleTab('aeroporto')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeExampleTab === 'aeroporto'
                  ? 'bg-brand-ink text-white shadow-sm'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-ink border border-brand-border'
              }`}
            >
              ✈️ Família com Malas no Aeroporto
            </button>
          </div>
        </div>

        {/* Dynamic Card according to selected real simple route */}
        {activeExampleTab === 'familia' && (
          <BoardingPassCard
            title="Passeio em Família para Sítio no Sábado"
            badgeText="Passeio de Fim de Semana"
            origin="Penha (Zona Leste) - São Paulo"
            destination="Sítio & Chácara em Mairiporã - SP (Ida e Volta)"
            date="Sábado · Saída 08h · Volta 18h"
            passengers={15}
            vehicleModel="Mercedes-Benz Sprinter (19 Lugares com Ar)"
            driverName="Seu Carlos (Faz transporte escolar na semana)"
            driverBio="Motorista há 12 anos na Penha, tem o sábado livre e adora levar famílias para passeios tranquilos."
            priceTotal={680}
            pricePerPerson={45}
            onSelect={handleStartRequest}
          />
        )}

        {activeExampleTab === 'criancas' && (
          <BoardingPassCard
            title="Levar as Crianças para Aniversário / Parque"
            badgeText="Passeio com Monitoria"
            origin="Santana (Zona Norte) - São Paulo"
            destination="Buffet Infantil no Tatuapé (Zona Leste)"
            date="Domingo · Saída 13h30 · Retorno 18h30"
            passengers={12}
            vehicleModel="Ford Transit Escolar com Cinto em Todos os Bancos"
            driverName="Tia Valquíria & Monitor"
            driverBio="Van escolar credenciada no DTP, com monitora para cuidar das crianças no embarque e desembarque."
            priceTotal={420}
            pricePerPerson={35}
            onSelect={handleStartRequest}
          />
        )}

        {activeExampleTab === 'aeroporto' && (
          <BoardingPassCard
            title="Família e Amigos para o Aeroporto com Malas"
            badgeText="Traslado Sem Estresse"
            origin="Vila Mariana - São Paulo"
            destination="Aeroporto de Guarulhos (GRU) - Terminal 2"
            date="Sexta-feira · Saída 05h da manhã"
            passengers={10}
            vehicleModel="Renault Master Executiva com Bagageiro Grande"
            driverName="Marcos Vinícius"
            driverBio="Amplo espaço para malas grandes e pranchas, pontualidade britânica para ninguém perder o voo."
            priceTotal={480}
            pricePerPerson={48}
            onSelect={handleStartRequest}
          />
        )}
      </section>

      {/* 4. Como Funciona para os Passageiros (Sem complicação) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Como funciona para quem quer viajar junto
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Nada de burocracia ou formulários difíceis. Em três passos rápidos você combina a viagem:
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
                Conte para onde você quer ir
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Informe o dia, quantas pessoas vão (família, amigos, crianças) e se precisa pegar gente em mais de um lugar do bairro.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow text-brand-ink font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-bold text-brand-ink">
                Motoristas da sua região mandam orçamentos
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Quem tiver a van livre naquele dia envia o valor certinho, fotos da van e os detalhes. Você conversa direto e escolhe o que achar melhor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-green text-white font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-bold text-brand-ink">
                Embarque com tranquilidade
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                O motorista busca a turma no horário combinado, todo mundo viaja sentado com cinto de segurança e a diversão começa na van.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Special Section for Independent Drivers (O "Tio da Van") */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4E8] rounded-4xl border-2 border-brand-border-strong p-8 sm:p-12 shadow-towel relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-black text-amber-900 bg-brand-yellow px-3 py-1 rounded-full uppercase tracking-wider">
                Para quem tem van própria
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
                Tem a van parada no sábado ou domingo? Faça viagens na sua região.
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Você que tem sua van escolar, faz fretamento ou trabalha por conta própria: sabe como é bom arrumar uma graninha extra no fim de semana levando um grupo para um passeio, casamento ou sítio.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-brand-ink font-semibold pt-1">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                  Você escolhe quais viagens quer fazer conforme sua disponibilidade.
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                  Diga o seu preço justo direto para o passageiro, sem taxa surpresa.
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                  Atenda famílias, colégios e grupos do seu bairro que valorizam seu cuidado.
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleJoinProvider}
                  className="px-6 py-3.5 bg-brand-ink hover:bg-[#253757] text-white font-extrabold text-sm rounded-full shadow-sm transition-transform active:scale-95 flex items-center gap-2"
                >
                  <span>Cadastrar Minha Van para Fim de Semana</span>
                  <ArrowRight className="w-4 h-4 text-brand-yellow" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft text-center space-y-3">
                <AuditStampIllustration className="w-28 h-28 mx-auto" text="MOTORISTA SP" />
                <p className="text-xs font-bold text-brand-ink">Comunidade de Motoristas</p>
                <p className="text-[11px] text-brand-muted">
                  Trabalho honesto, viagens tranquilas e mais renda para quem cuida bem do seu veículo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Segurança e Cuidado com as Crianças e Famílias */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-4xl border-2 border-brand-border-strong p-8 sm:p-12 shadow-towel space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
              Paz de espírito para os pais e para quem organiza
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Sabemos que transportar quem você ama exige muita confiança. Por isso fazemos questão de manter as coisas bem certinhas:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-brand-canvas rounded-2xl border border-brand-border space-y-2 text-center sm:text-left">
              <ShieldCheck className="w-6 h-6 text-brand-green mx-auto sm:mx-0" />
              <h3 className="text-sm font-bold text-brand-ink">Motoristas Habilitados</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                CNH profissional categoria D com a observação EAR (Exerce Atividade Remunerada) verificada.
              </p>
            </div>

            <div className="p-4 bg-brand-canvas rounded-2xl border border-brand-border space-y-2 text-center sm:text-left">
              <CheckCircle2 className="w-6 h-6 text-brand-blue mx-auto sm:mx-0" />
              <h3 className="text-sm font-bold text-brand-ink">Vans com Vistoria</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Veículo revisado com cinto de segurança em todos os bancos e espaço para as mochilas e malas.
              </p>
            </div>

            <div className="p-4 bg-brand-canvas rounded-2xl border border-brand-border space-y-2 text-center sm:text-left">
              <Heart className="w-6 h-6 text-brand-yellow mx-auto sm:mx-0" />
              <h3 className="text-sm font-bold text-brand-ink">Seguro para Todos</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Cobertura de seguro contra acidentes pessoais a passageiros (APP) para todo mundo viajar sossegado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Warm & Simple Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
          Vai passear ou precisa levar a turma para algum lugar?
        </h2>
        <p className="text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
          Peça um orçamento simples. Você recebe as opções de motoristas de van da sua região e combina direto, sem compromisso.
        </p>
        <div className="pt-2">
          <button
            onClick={handleStartRequest}
            className="px-10 py-5 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-lg rounded-full shadow-towel hover:scale-105 active:scale-95 transition-all"
          >
            Pedir uma Van para Meu Grupo
          </button>
        </div>
      </section>
    </div>
  );
};
