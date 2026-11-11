import React from 'react';
import { AuditStampIllustration } from '../illustrations/AuditStampIllustration';
import { MapPin, Users, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BoardingPassProps {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  vehicleModel: string;
  driverName: string;
  fairPrice: number;
  traditionalQuotePrice: number;
  onSelect?: () => void;
  className?: string;
}

export const BoardingPassCard: React.FC<BoardingPassProps> = ({
  origin,
  destination,
  date,
  passengers,
  vehicleModel,
  driverName,
  fairPrice,
  traditionalQuotePrice,
  onSelect,
  className = '',
}) => {
  return (
    <div
      className={`relative bg-brand-surface rounded-3xl border-2 border-brand-border-strong shadow-towel overflow-hidden transition-all hover:shadow-towel-hover ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x-2 divide-dashed divide-brand-border-strong">
        {/* Left Section: Real Itinerary & Journey Specs */}
        <div className="md:col-span-8 p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-extrabold tracking-wider text-brand-blue uppercase bg-brand-blue-soft px-3 py-1 rounded-full">
              Caso Real Verificado · Rota Grande SP
            </span>
            <span className="text-xs font-semibold text-brand-muted">
              Código: #SP-GRU-2026
            </span>
          </div>

          {/* Route Display with Sinuous Nodes */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-blue border-2 border-white shadow-sm" />
                <span className="w-0.5 h-10 bg-brand-border-strong border-dashed" />
                <span className="w-3.5 h-3.5 rounded-full bg-brand-yellow border-2 border-white shadow-sm" />
              </div>
              <div className="space-y-4 flex-1 -mt-1">
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Ponto de Embarque</p>
                  <p className="text-sm sm:text-base font-bold text-brand-ink">{origin}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Destino Final</p>
                  <p className="text-sm sm:text-base font-bold text-brand-ink">{destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Specs & Driver Audit */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-brand-muted border-t border-brand-border">
            <div className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-brand-blue" />
              <span>{passengers} passageiros</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-brand-green" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-brand-ink">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>{vehicleModel}</span>
            </div>
          </div>
        </div>

        {/* Right Section: The Price Contrast (R$ 24.000 vs R$ 19.800) & Stamp */}
        <div className="md:col-span-4 p-6 sm:p-7 bg-[#FCFAF7] flex flex-col justify-between relative">
          {/* Authentic Audit Stamp in the corner */}
          <div className="absolute top-2 right-2 pointer-events-none opacity-85">
            <AuditStampIllustration className="w-20 h-20" text="AUDITADO SP" />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-brand-muted">
                Orçamento de grande transportadora:
              </p>
              <p className="text-sm font-bold text-slate-400 line-through">
                R$ {traditionalQuotePrice.toLocaleString('pt-BR')}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold text-brand-green uppercase tracking-wide">
                Valor Fechado na VanBora:
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                R$ {fairPrice.toLocaleString('pt-BR')}
              </p>
              <p className="text-[11px] text-brand-muted">
                Motorista: <strong>{driverName}</strong>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onSelect}
              className="w-full py-3 px-4 bg-brand-blue hover:bg-[#1e54cc] text-white font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Simular Rota Semelhante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
