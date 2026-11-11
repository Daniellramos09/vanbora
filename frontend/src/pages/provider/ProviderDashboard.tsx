import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Truck,
  FileCheck,
  Send,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';

interface ProviderDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ setCurrentTab }) => {
  const { currentUser, requests, proposals, vehicles, documents, bookings } = useApp();

  const compatibleRequests = requests.filter((r) => r.status === 'RECEIVING_PROPOSALS');
  const myProposals = proposals.filter((p) => p.providerId === currentUser.id);
  const myBookings = bookings.filter((b) => b.providerId === currentUser.id);

  // Check if any document needs correction
  const pendingDocs = documents.filter(
    (d) => d.status === 'CORRECTION_REQUIRED' || d.status === 'UNDER_REVIEW'
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-text">
              Painel do Prestador — {currentUser.name}
            </h1>
            <Badge variant="approved">Cadastro Regular</Badge>
          </div>
          <p className="text-xs text-brand-muted">
            Região de atuação principal: {currentUser.city} · Frota: {vehicles.length} van(s) ativas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTab('provider-vehicles')}
            icon={<Plus className="w-4 h-4" />}
          >
            Cadastrar Van
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentTab('provider-requests')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Ver Oportunidades ({compatibleRequests.length})
          </Button>
        </div>
      </div>

      {/* Compliance / Document Alert according to README 02 & 03 */}
      {pendingDocs.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Atenção: Existem documentos que precisam da sua ação
              </h4>
              <p className="text-xs text-amber-800/90 leading-relaxed mt-0.5">
                {pendingDocs.length} documento(s) com pendência ou em análise. Mantenha suas certidões e seguro APP em dia para continuar enviando propostas comerciais.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-900 hover:bg-amber-100 flex-shrink-0"
            onClick={() => setCurrentTab('provider-documents')}
          >
            Regularizar Documentos
          </Button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Solicitações no Radar</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{compatibleRequests.length}</h3>
            <p className="text-[10px] text-brand-muted">Na Grande SP</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-light text-amber-700 flex items-center justify-center flex-shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Propostas Enviadas</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{myProposals.length}</h3>
            <p className="text-[10px] text-brand-muted">Aguardando clientes</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Serviços Fechados</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{myBookings.length}</h3>
            <p className="text-[10px] text-brand-muted">Contratos confirmados</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Situação Cadastral</p>
            <h3 className="text-lg font-extrabold text-brand-text">Aprovado</h3>
            <p className="text-[10px] text-emerald-600 font-semibold">100% Regular</p>
          </div>
        </Card>
      </div>

      {/* Recommended Requests to Quote */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-text">Oportunidades em Destaque</h2>
            <p className="text-xs text-brand-muted">
              Clientes aguardando orçamentos para trajetos na sua região de disponibilidade.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('provider-requests')}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compatibleRequests.map((req) => (
            <Card key={req.id} className="p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue-light text-brand-blue uppercase">
                    {req.category}
                  </span>
                  <span className="text-xs font-semibold text-brand-muted">
                    {req.passengers} passageiros
                  </span>
                </div>

                <h4 className="text-sm font-bold text-brand-text line-clamp-1">{req.title}</h4>

                <div className="space-y-1 text-xs text-slate-600">
                  <p className="truncate"><strong>Origem:</strong> {req.origin}</p>
                  <p className="truncate"><strong>Destino:</strong> {req.destination}</p>
                  <p><strong>Data:</strong> {new Date(req.date).toLocaleDateString('pt-BR')} ({req.time})</p>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">Estimativa:</span>
                  <span className="text-sm font-bold text-brand-text">
                    R$ {req.estimatedBudgetMin} - {req.estimatedBudgetMax}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setCurrentTab('provider-requests')}
                >
                  Enviar Proposta
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
