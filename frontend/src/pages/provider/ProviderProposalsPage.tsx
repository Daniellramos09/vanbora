import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { Truck, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface ProviderProposalsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ProviderProposalsPage: React.FC<ProviderProposalsPageProps> = ({ setCurrentTab }) => {
  const { proposals, requests, currentUser } = useApp();

  const myProposals = proposals.filter((p) => p.providerId === currentUser.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">Minhas Propostas Enviadas</h1>
        <p className="text-sm text-brand-muted">
          Acompanhe o retorno dos clientes para os orçamentos que você enviou.
        </p>
      </div>

      {myProposals.length === 0 ? (
        <EmptyState
          title="Nenhuma proposta enviada ainda"
          description="Você ainda não enviou propostas para as solicitações abertas. Acesse as oportunidades e envie orçamentos para conseguir novos clientes."
          actionText="Buscar Oportunidades"
          onAction={() => setCurrentTab('provider-requests')}
        />
      ) : (
        <div className="space-y-4">
          {myProposals.map((prop) => {
            const req = requests.find((r) => r.id === prop.requestId);
            return (
              <Card key={prop.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue-light text-brand-blue uppercase">
                        {req ? req.category : 'Serviço'}
                      </span>
                      <span className="text-xs text-brand-muted">Proposta #{prop.id}</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-text mt-1">
                      {req ? req.title : 'Solicitação de Transporte'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <p className="text-xl font-extrabold text-brand-blue-dark">
                        R$ {prop.price.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-[10px] text-brand-muted">Valor proposto</p>
                    </div>
                    <Badge
                      variant={
                        prop.status === 'ACCEPTED'
                          ? 'confirmed'
                          : prop.status === 'REJECTED'
                          ? 'rejected'
                          : 'under_review'
                      }
                    >
                      {prop.status === 'ACCEPTED'
                        ? 'Aceita pelo Cliente'
                        : prop.status === 'REJECTED'
                        ? 'Não Selecionada'
                        : 'Aguardando Avaliação'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-brand-bg p-3.5 rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[10px] block">Veículo Ofertado:</span>
                    <span className="font-semibold text-brand-text">{prop.vehicleModel}</span>
                    <span className="text-brand-muted block">Capacidade: {prop.vehicleCapacity} passageiros</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[10px] block">Condições Enviadas:</span>
                    <span className="text-slate-700">{prop.conditions}</span>
                  </div>
                </div>

                {prop.notes && (
                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-brand-border">
                    <strong>Mensagem anexada:</strong> "{prop.notes}"
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
