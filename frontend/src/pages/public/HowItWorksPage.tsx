import React from 'react';
import { VanWithDriverIllustration } from '../../components/illustrations/VanWithDriverIllustration';
import { ArrowRight, Heart, Users, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ink">
          Como funciona a VanBora
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Tornamos simples o que antes dependia de procurar contatos no caderno ou ficar pedindo indicação de vizinho. Conexão direta, transparente e amigável.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-ink text-white font-extrabold flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-ink">Você conta o que precisa</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-1">
                Diga onde quer pegar a galera, para onde vão passear e quantas pessoas vão no grupo. Pode ter paradas no caminho para buscar parentes ou amigos.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow text-brand-ink font-extrabold flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-ink">Motoristas com van livre te respondem</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-1">
                Quem tiver a van disponível naquele dia ou fim de semana manda o orçamento com o modelo da van, fotos e o preço combinado direto, sem taxa escondida.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-green text-white font-extrabold flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-ink">Você escolhe e combina a viagem</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-1">
                Escolha o motorista que mais gostou, confirme o horário e pronto! Todo mundo viaja junto, em segurança e sem dor de cabeça de trânsito.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-surface p-7 rounded-4xl border-2 border-brand-border-strong shadow-towel flex flex-col items-center text-center space-y-4">
          <VanWithDriverIllustration className="w-full h-auto" />
          <h4 className="text-lg font-bold text-brand-ink">Planejando um passeio ou evento?</h4>
          <p className="text-xs text-brand-muted">Peça um orçamento sem compromisso e veja quanto fica para o seu grupo.</p>
          <button
            onClick={() => setCurrentTab('new-request')}
            className="w-full py-3.5 px-6 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-sm rounded-full shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Pedir Orçamento Simples</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
