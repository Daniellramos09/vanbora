import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { VanIllustration } from '../../components/illustrations/VanIllustration';
import { Truck, CheckCircle2, DollarSign, Shield, ArrowRight } from 'lucide-react';

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
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-brand-yellow-light px-3 py-1 rounded-full border border-amber-200">
            Para Proprietários Independentes e Frotistas
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text leading-tight">
            Acabe com a ociosidade da sua van e conquiste novos contratos.
          </h1>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Você que tem van escolar ou de fretamento sabe como é depender apenas do boca a boca para conseguir serviços extras no meio da semana ou aos finais de semana. A VanBora traz as oportunidades até você.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-brand-text">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Receba solicitações reais de empresas, famílias e instituições</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-brand-text">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Defina seu próprio preço e condições em cada proposta</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-brand-text">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>Valorização do motorista devidamente legalizado e com veículo auditado</span>
            </div>
          </div>

          <div className="pt-2">
            <Button size="lg" variant="primary" onClick={handleStart} icon={<ArrowRight className="w-5 h-5" />}>
              Acessar Painel do Motorista / Cadastrar Van
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft w-full text-center space-y-4">
            <VanIllustration className="w-full h-44" />
            <div className="bg-brand-bg p-3.5 rounded-2xl border border-brand-border text-xs text-left space-y-1">
              <p className="font-bold text-brand-text">Requisitos para participar:</p>
              <p className="text-slate-600">✓ CNH categoria D com observação EAR ativa</p>
              <p className="text-slate-600">✓ Veículo aluguel com laudo semestral de vistoria</p>
              <p className="text-slate-600">✓ Seguro APP de passageiros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
