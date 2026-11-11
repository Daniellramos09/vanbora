import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Plus,
  Clock,
  CheckCircle,
  FileText,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface ClientDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ setCurrentTab }) => {
  const { currentUser, requests, bookings } = useApp();

  const activeRequests = requests.filter((r) => r.status === 'RECEIVING_PROPOSALS');
  const totalProposals = requests.reduce((acc, curr) => acc + curr.proposalsCount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header with Greeting & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-text">
              Olá, {currentUser.name}!
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-brand-green border border-emerald-200">
              Conta PJ Verificada
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            Gerencie seus itinerários, compare orçamentos e formalize viagens com segurança na Grande São Paulo.
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={() => setCurrentTab('new-request')}
          icon={<Plus className="w-5 h-5" />}
          className="shadow-md"
        >
          Solicitar Novo Transporte
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Solicitações Ativas</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{activeRequests.length}</h3>
            <p className="text-[11px] text-brand-muted">Recebendo orçamentos</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-light text-amber-700 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Propostas Recebidas</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{totalProposals}</h3>
            <p className="text-[11px] text-brand-muted">Aguardando sua avaliação</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Viagens Confirmadas</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{bookings.length}</h3>
            <p className="text-[11px] text-brand-muted">Com motorista e van garantidos</p>
          </div>
        </Card>
      </div>

      {/* Active Requests List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-text">Minhas Solicitações Recentes</h2>
          <button
            onClick={() => setCurrentTab('client-requests')}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {requests.slice(0, 2).map((req) => (
            <Card key={req.id} className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue-light text-brand-blue uppercase">
                    {req.category}
                  </span>
                  <h4 className="text-sm font-bold text-brand-text">{req.title}</h4>
                </div>
                <Badge variant={req.status === 'CONTRACTED' ? 'confirmed' : 'under_review'}>
                  {req.status === 'CONTRACTED' ? 'Contratado' : `${req.proposalsCount} propostas`}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-muted">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                  <span className="truncate">Origem: {req.origin}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span className="truncate">Destino: {req.destination}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs">
                <span className="text-brand-muted">
                  Data: {new Date(req.date).toLocaleDateString('pt-BR')} ({req.time}) · {req.passengers} passageiros
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentTab('client-requests')}
                >
                  Ver Propostas ({req.proposalsCount})
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmed Services Banner */}
      {bookings.length > 0 && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Shield className="w-4 h-4 text-brand-green" />
              <span>Próximo Transporte Confirmado</span>
            </div>
            <button
              onClick={() => setCurrentTab('client-bookings')}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              Ver comprovante
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-brand-text text-sm">
                {bookings[0].origin.split('-')[0]} ➔ {bookings[0].destination.split('-')[0]}
              </p>
              <p className="text-brand-muted">
                Motorista: <strong>{bookings[0].providerName}</strong> · Veículo: {bookings[0].vehicleModel}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-extrabold text-sm text-brand-text">
                R$ {bookings[0].price.toLocaleString('pt-BR')}
              </p>
              <p className="text-emerald-700 font-semibold">
                {new Date(bookings[0].date).toLocaleDateString('pt-BR')} às {bookings[0].time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
