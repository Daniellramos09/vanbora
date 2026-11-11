import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  Calendar,
  MapPin,
  Truck,
  Users,
  ShieldCheck,
  FileCheck2,
  Phone,
} from 'lucide-react';

interface ClientBookingsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ClientBookingsPage: React.FC<ClientBookingsPageProps> = ({ setCurrentTab }) => {
  const { bookings } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-text">Contratações Formalizadas</h1>
          <p className="text-sm text-brand-muted">
            Serviços com van e motorista confirmados com veículo verificado e termos registrados.
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          title="Nenhuma contratação realizada"
          description="Assim que você aceitar a proposta de um motorista para suas solicitações, o contrato aparecerá aqui."
          actionText="Ver Solicitações"
          onAction={() => setCurrentTab('client-requests')}
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <Card key={b.id} className="p-6 space-y-4 border-l-4 border-l-brand-green">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Contrato Confirmado
                    </span>
                    <span className="text-xs text-brand-muted">Registro: #{b.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text mt-1">
                    {b.origin.split('-')[0]} ➔ {b.destination.split('-')[0]}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xl font-extrabold text-brand-blue-dark">
                    R$ {b.price.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[11px] text-brand-muted">Valor contratado</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-brand-bg p-3.5 rounded-2xl border border-brand-border space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Prestador Responsável</p>
                  <p className="font-bold text-brand-text text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-blue" />
                    <span>{b.providerName}</span>
                  </p>
                  <p className="text-brand-muted">Veículo: {b.vehicleModel}</p>
                </div>

                <div className="bg-brand-bg p-3.5 rounded-2xl border border-brand-border space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Data e Horário</p>
                  <p className="font-bold text-brand-text text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    <span>{new Date(b.date).toLocaleDateString('pt-BR')}</span>
                  </p>
                  <p className="text-brand-muted">Embarque às {b.time} · {b.passengers} passageiros</p>
                </div>

                <div className="bg-brand-bg p-3.5 rounded-2xl border border-brand-border space-y-1">
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Garantias do Serviço</p>
                  <p className="font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                    <span>Motorista e Veículo Verificados</span>
                  </p>
                  <p className="text-slate-500 text-[11px]">CNH D/EAR e CRLV em dia</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-brand-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    {b.origin}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<FileCheck2 className="w-4 h-4" />}
                    onClick={() => alert(`Comprovante de Contrato #${b.id}\nOrigem: ${b.origin}\nDestino: ${b.destination}\nPrestador: ${b.providerName}\nValor: R$ ${b.price}\nTermos de Transporte e Compromisso de Viagem vinculados.`)}
                  >
                    Ver Comprovante Formal
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
