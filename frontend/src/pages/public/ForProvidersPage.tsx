import React from 'react';
import { useApp } from '../../context/AppContext';
import { VanWithDriverIllustration } from '../../components/illustrations/VanWithDriverIllustration';
import { CheckCircle2, ArrowRight, Heart, Calendar, Smile } from 'lucide-react';

export const ForProvidersPage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  const { setRole } = useApp();

  const handleStart = () => {
    setRole('provider');
    setCurrentTab('provider-dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-black text-amber-900 bg-brand-yellow px-3 py-1 rounded-full uppercase tracking-wider">
            Para Motoristas de Van Autônomos
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-ink leading-tight">
            Arrumar uma graninha extra no sábado levando famílias e amigos para passear.
          </h1>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Você que tem sua van escolar ou de fretamento na Grande São Paulo sabe como é ter o fim de semana livre. Em vez de deixar a van parada na garagem, receba pedidos diretos de famílias, colégios e grupos do seu bairro que precisam de um motorista de confiança.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-ink">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Você escolhe quando quer rodar: sábado, domingo ou folgas</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-ink">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Preço justo já calculado pelo site — sem dor de cabeça de negociação</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-ink">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Pessoas do seu bairro que valorizam seu cuidado e pontualidade</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-sm rounded-full shadow-towel transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Cadastrar Minha Van para Viagens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-brand-surface p-6 rounded-3xl border-2 border-brand-border-strong shadow-towel w-full text-center space-y-4">
            <VanWithDriverIllustration className="w-full h-auto" />
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-brand-border text-xs text-left space-y-1.5">
              <p className="font-bold text-brand-ink">O que é bom ter em dia:</p>
              <p className="text-brand-muted">✓ CNH categoria D com menção EAR</p>
              <p className="text-brand-muted">✓ Van revisada com cinto em todos os assentos</p>
              <p className="text-brand-muted">✓ Documentação do veículo em dia (CRLV)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
