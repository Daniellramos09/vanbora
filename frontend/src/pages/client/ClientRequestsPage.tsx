import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { TransportRequest, Proposal } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  MapPin,
  Calendar,
  Users,
  Eye,
  CheckCircle2,
  Star,
  ShieldCheck,
  Truck,
  Plus,
} from 'lucide-react';

interface ClientRequestsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ClientRequestsPage: React.FC<ClientRequestsPageProps> = ({ setCurrentTab }) => {
  const { requests, proposals, acceptProposal } = useApp();
  const toast = useToast();
  const [selectedRequest, setSelectedRequest] = useState<TransportRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptedSuccess, setAcceptedSuccess] = useState(false);

  // Proposals for the selected request
  const requestProposals = selectedRequest
    ? proposals.filter((p) => p.requestId === selectedRequest.id)
    : [];

  const handleOpenProposals = (req: TransportRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
    setAcceptedSuccess(false);
  };

  const handleAccept = (proposalId: string) => {
    if (!selectedRequest) return;
    acceptProposal(proposalId, selectedRequest.id);
    setAcceptedSuccess(true);
    toast.success('Contrato Formalizado!', 'A proposta foi aceita e o bilhete da viagem já está disponível em Contratos.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-text">Minhas Solicitações de Transporte</h1>
          <p className="text-sm text-brand-muted">
            Acompanhe o status e compare propostas recebidas de prestadores credenciados.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setCurrentTab('new-request')}
          icon={<Plus className="w-4 h-4" />}
        >
          Nova Solicitação
        </Button>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          title="Nenhuma solicitação encontrada"
          description="Quando você solicitar um transporte, suas solicitações aparecerão aqui com as propostas dos motoristas."
          actionText="Solicitar Transporte Agora"
          onAction={() => setCurrentTab('new-request')}
        />
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <Card key={req.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-brand-blue-light text-brand-blue uppercase">
                      {req.category}
                    </span>
                    <h3 className="text-base font-bold text-brand-text">{req.title}</h3>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Publicada em {new Date(req.createdAt).toLocaleDateString('pt-BR')} · ID: #{req.id}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'RECEIVING_PROPOSALS' ? (
                    <Badge variant="under_review">Recebendo Propostas</Badge>
                  ) : req.status === 'CONTRACTED' ? (
                    <Badge variant="confirmed">Contratado</Badge>
                  ) : (
                    <Badge variant="info">{req.status}</Badge>
                  )}
                </div>
              </div>

              {/* Itinerary Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-slate-500 uppercase text-[10px]">Origem</p>
                  <p className="font-semibold text-brand-text flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    <span>{req.origin}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-500 uppercase text-[10px]">Destino</p>
                  <p className="font-semibold text-brand-text flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{req.destination}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-500 uppercase text-[10px]">Data & Passageiros</p>
                  <div className="flex items-center gap-3 font-semibold text-brand-text">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(req.date).toLocaleDateString('pt-BR')} ({req.time})
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {req.passengers} passageiros
                    </span>
                  </div>
                </div>
              </div>

              {/* Waypoints badge if any */}
              {req.waypoints && req.waypoints.length > 0 && (
                <div className="text-xs bg-brand-bg p-2.5 rounded-xl border border-brand-border flex items-center gap-2">
                  <span className="font-bold text-brand-text">Paradas intermediárias ({req.waypoints.length}):</span>
                  <span className="text-brand-muted truncate">
                    {req.waypoints.map((w) => w.address).join(' ➔ ')}
                  </span>
                </div>
              )}

              {/* Bottom Actions and Proposal counter */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs">
                  <span className="font-bold text-brand-text">{req.proposalsCount} proposta(s)</span>{' '}
                  <span className="text-brand-muted">de motoristas habilitados</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={req.proposalsCount > 0 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleOpenProposals(req)}
                    icon={<Eye className="w-4 h-4" />}
                  >
                    {req.proposalsCount > 0 ? `Comparar ${req.proposalsCount} Proposta(s)` : 'Ver Detalhes'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Comparison Modal (Section 4.2 & Section 8 of README 03) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRequest ? `Propostas para: ${selectedRequest.title}` : 'Propostas'}
        maxWidth="2xl"
      >
        {acceptedSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-brand-text">Proposta Aceita com Sucesso!</h3>
            <p className="text-sm text-brand-muted max-w-md mx-auto">
              O serviço foi formalizado e a contratação confirmada. Os dados completos do motorista e placa foram liberados em suas Contratações.
            </p>
            <div className="pt-3">
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentTab('client-bookings');
                }}
              >
                Acessar Minhas Contratações
              </Button>
            </div>
          </div>
        ) : requestProposals.length === 0 ? (
          <EmptyState
            title="Ainda não recebemos propostas"
            description="Os prestadores compatíveis na Grande SP estão analisando o itinerário. Você receberá notificações assim que enviarem orçamentos."
          />
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-brand-muted">
              Compare as condições, veículos e avaliações antes de escolher o melhor prestador para sua viagem.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {requestProposals.map((prop) => (
                <div
                  key={prop.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    prop.status === 'ACCEPTED'
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-white border-brand-border hover:shadow-soft'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
                        <Truck className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-brand-text">{prop.providerName}</h4>
                          <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-current" />
                            {prop.providerRating}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                          <span>Documentação e CNH EAR Auditada · {prop.providerTripsCount} viagens</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xl font-extrabold text-brand-blue-dark">
                        R$ {prop.price.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-[10px] text-brand-muted">Valor total do serviço</p>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-brand-bg p-2.5 rounded-xl border border-brand-border">
                      <span className="text-[10px] uppercase font-bold text-brand-muted block">Veículo Ofertado:</span>
                      <span className="font-semibold text-brand-text">{prop.vehicleModel}</span>
                      <span className="text-brand-muted block text-[11px]">Capacidade: {prop.vehicleCapacity} lugares</span>
                    </div>

                    <div className="bg-brand-bg p-2.5 rounded-xl border border-brand-border">
                      <span className="text-[10px] uppercase font-bold text-brand-muted block">Condições Comerciais:</span>
                      <span className="font-medium text-slate-700 text-[11px]">{prop.conditions}</span>
                    </div>
                  </div>

                  {prop.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3 border border-slate-200">
                      <strong>Mensagem do motorista:</strong> "{prop.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Enviada em {new Date(prop.createdAt).toLocaleDateString('pt-BR')}
                    </span>

                    {selectedRequest?.status === 'CONTRACTED' ? (
                      prop.status === 'ACCEPTED' ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Proposta Contratada
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Não selecionada</span>
                      )
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleAccept(prop.id)}
                        icon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Aceitar e Formalizar Contratação
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
