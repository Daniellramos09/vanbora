import React from 'react';
import { Compass, Heart, Users, Calendar, Plane } from 'lucide-react';

export const CategoriesPage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ink">
          Para onde você e seu grupo querem ir?
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Seja um passeio de sábado no sítio, um aniversário infantil ou levar a galera para o aeroporto, tem sempre uma van certa na Grande São Paulo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category 1: Passeio em Família / Sítio */}
        <div className="p-7 bg-brand-surface rounded-3xl border-2 border-brand-border-strong space-y-3 shadow-sm hover:shadow-towel transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-light text-amber-800 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-ink">Passeios em Família e Sítios no Sábado</h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Reúna a família para um dia de sol em Mairiporã, São Roque, Ibiúna ou na praia. O motorista busca todo mundo no bairro, espera o dia do passeio e traz todos de volta em segurança.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-amber-900 bg-brand-yellow-light px-3 py-1 rounded-full">
              Ida e volta garantidas com bagageiro
            </span>
          </div>
        </div>

        {/* Category 2: Crianças e Aniversários */}
        <div className="p-7 bg-brand-surface rounded-3xl border-2 border-brand-border-strong space-y-3 shadow-sm hover:shadow-towel transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-green-soft text-brand-green flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-ink">Crianças, Aniversários e Passeios</h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Levar a turminha da escola para um buffet infantil, parque temático ou apresentação de dança. Vans com cinto em todos os assentos e motoristas experientes no trato com os pequenos.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-brand-green bg-brand-green-soft px-3 py-1 rounded-full">
              Cuidado, cinto para todos e monitoria
            </span>
          </div>
        </div>

        {/* Category 3: Festas, Casamentos e Shows */}
        <div className="p-7 bg-brand-surface rounded-3xl border-2 border-brand-border-strong space-y-3 shadow-sm hover:shadow-towel transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-ink">Casamentos, Festas e Shows com Amigos</h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Ninguém precisa ser o "motorista da rodada" nem se preocupar com trânsito ou blitz. A turma vai junta ouvindo música e volta com todo mundo são e salvo.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-brand-blue bg-brand-blue-soft px-3 py-1 rounded-full">
              Diversão para todo o grupo
            </span>
          </div>
        </div>

        {/* Category 4: Família com Malas para Aeroportos */}
        <div className="p-7 bg-brand-surface rounded-3xl border-2 border-brand-border-strong space-y-3 shadow-sm hover:shadow-towel transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#F0EBF8] text-purple-700 flex items-center justify-center font-bold">
            <Plane className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-ink">Aeroportos (GRU e Congonhas) com Malas</h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Chega de chamar 3 carros por aplicativo e ficar rezando para as malas caberem no porta-malas. A van leva a família inteira e todas as bagagens com tranquilidade.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold text-purple-800 bg-[#F0EBF8] px-3 py-1 rounded-full">
              Espaço de sobra para malas
            </span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentTab('new-request')}
          className="px-8 py-4 bg-brand-blue hover:bg-[#1d55cc] text-white font-extrabold text-sm rounded-full shadow-towel transition-transform active:scale-95"
        >
          Pedir Orçamento para Qualquer um Desses Passeios
        </button>
      </div>
    </div>
  );
};
