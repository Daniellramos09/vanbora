import React from 'react';
import { AuditStampIllustration } from '../illustrations/AuditStampIllustration';
import { Users, Calendar, CheckCircle2, Heart } from 'lucide-react';

interface SimpleTripCardProps {
  title: string;
  badgeText?: string;
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  vehicleModel: string;
  driverName: string;
  driverBio?: string;
  priceTotal: number;
  pricePerPerson: number;
  onSelect?: () => void;
  className?: string;
}

export const BoardingPassCard: React.FC<SimpleTripCardProps> = ({
  title = 'Passeio em Família de Fim de Semana',
  badgeText = 'Exemplo de Viagem Real no Sábado',
  origin = 'Penha (Zona Leste) - São Paulo',
  destination = 'Sítio / Chácara em Mairiporã - SP (Ida e Volta)',
  date = 'Sábado (Saída 08h · Volta 18h)',
  passengers = 15,
  vehicleModel = 'Mercedes-Benz Sprinter (19 Lugares)',
  driverName = 'Seu Carlos (Van Escolar na semana)',
  driverBio = 'Motorista há 12 anos na Zona Leste, faz passeios com famílias e amigos aos sábados.',
  priceTotal = 680,
  pricePerPerson = 45,
  onSelect,
  className = '',
}) => {
  return (
    <div
      className={`relative bg-brand-surface rounded-3xl border-2 border-brand-border-strong shadow-towel overflow-hidden transition-all hover:shadow-towel-hover ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x-2 divide-dashed divide-brand-border-strong">
        {/* Left Section: Real Itinerary & Journey Specs */}
        <div className="md:col-span-8 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-extrabold tracking-wider text-brand-blue uppercase bg-brand-blue-soft px-3 py-1 rounded-full">
              {badgeText}
            </span>
            <span className="text-xs font-semibold text-brand-green flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Viagem tranquila e combinada direto
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-brand-ink">
            {title}
          </h3>

          {/* Route Display */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-blue border-2 border-white shadow-sm" />
                <span className="w-0.5 h-8 bg-brand-border-strong border-dashed" />
                <span className="w-3.5 h-3.5 rounded-full bg-brand-yellow border-2 border-white shadow-sm" />
              </div>
              <div className="space-y-3 flex-1 -mt-0.5">
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Embarque da Turma</p>
                  <p className="text-sm font-bold text-brand-ink">{origin}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Destino do Passeio</p>
                  <p className="text-sm font-bold text-brand-ink">{destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver & Details */}
          <div className="pt-3 border-t border-brand-border flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <p className="text-brand-ink font-bold">
                Motorista: {driverName}
              </p>
              {driverBio && (
                <p className="text-[11px] text-brand-muted max-w-md">{driverBio}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-brand-ink">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>{vehicleModel}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Transparent price per person */}
        <div className="md:col-span-4 p-6 sm:p-7 bg-[#FCFAF7] flex flex-col justify-between relative">
          <div className="absolute top-2 right-2 pointer-events-none opacity-85">
            <AuditStampIllustration className="w-20 h-20" text="REGULAR SP" />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wide">
                Valor Total da Van:
              </p>
              <p className="text-2xl sm:text-3xl font-black text-brand-ink">
                R$ {priceTotal.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-brand-green font-bold mt-0.5">
                Apenas ~R$ {pricePerPerson} por pessoa (15 pessoas)
              </p>
            </div>

            <div className="text-xs text-brand-muted space-y-1">
              <p>✓ Ida e volta garantidas</p>
              <p>✓ Crianças e malas com espaço</p>
              <p>✓ Todo mundo junto sem dividir Ubers</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onSelect}
              className="w-full py-3 px-4 bg-brand-blue hover:bg-[#1e54cc] text-white font-extrabold text-xs rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Pedir Orçamento para Meu Passeio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
