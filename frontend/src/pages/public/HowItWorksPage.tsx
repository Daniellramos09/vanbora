import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { VanIllustration } from '../../components/illustrations/VanIllustration';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Calculator, FileCheck } from 'lucide-react';

export const HowItWorksPage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-brand-blue-light px-3 py-1 rounded-full">
          Transparência Total
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">Como a VanBora funciona</h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Digitalizamos a contratação de transporte por vans na Grande São Paulo, substituindo indicações informais por um ambiente seguro, auditado e com preços justos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue text-white font-extrabold flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-text">Publicação da Necessidade</h3>
              <p className="text-xs text-brand-muted leading-relaxed mt-1">
                Você informa origem, destino, quantidade de passageiros e se precisa de múltiplos pontos de embarque para recolher amigos, familiares ou colaboradores.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow-light text-amber-700 font-extrabold flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-text">Orçamento Operacional Justo</h3>
              <p className="text-xs text-brand-muted leading-relaxed mt-1">
                O sistema sugere uma faixa estimada com base em quilometragem, tempo e paradas. Motoristas independentes enviam propostas competitivas.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-green-light text-brand-green font-extrabold flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-text">Comparação e Formalização</h3>
              <p className="text-xs text-brand-muted leading-relaxed mt-1">
                Você escolhe a melhor proposta comparando modelo do veículo, capacidade, avaliações e condições comerciais. A contratação é registrada com seguro APP garantido.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-soft flex flex-col items-center text-center space-y-4">
          <VanIllustration className="w-full h-40" />
          <h4 className="text-base font-bold text-brand-text">Pronto para testar?</h4>
          <p className="text-xs text-brand-muted">Publique sua rota em menos de 2 minutos sem custo algum.</p>
          <Button variant="primary" onClick={() => setCurrentTab('new-request')} icon={<ArrowRight className="w-4 h-4" />}>
            Solicitar Transporte Agora
          </Button>
        </div>
      </div>
    </div>
  );
};
