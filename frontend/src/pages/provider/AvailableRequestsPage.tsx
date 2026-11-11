import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportRequest, Vehicle } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  MapPin,
  Calendar,
  Users,
  Send,
  Truck,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface AvailableRequestsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AvailableRequestsPage: React.FC<AvailableRequestsPageProps> = ({ setCurrentTab }) => {
  const { requests, vehicles, currentUser, addProposal } = useApp();

  const [selectedReq, setSelectedReq] = useState<TransportRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form states
  const [price, setPrice] = useState<number>(1200);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [conditions, setConditions] = useState('Inclui motorista, combustível, van higienizada e espera combinada.');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const openQuoteModal = (req: TransportRequest) => {
    setSelectedReq(req);
    setPrice(req.estimatedBudgetMin || 1000);
    setIsModalOpen(true);
    setSubmittedSuccess(false);
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    const chosenVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

    addProposal({
      requestId: selectedReq.id,
      providerId: currentUser.id,
      providerName: currentUser.name,
      providerRating: 4.9,
      providerTripsCount: 145,
      vehicleId: chosenVehicle.id,
      vehicleModel: chosenVehicle.model,
      vehicleCapacity: chosenVehicle.capacity,
      price: Number(price),
      conditions,
      notes,
    });

    setSubmittedSuccess(true);
  };

  const filteredRequests = requests.filter((r) => {
    if (r.status !== 'RECEIVING_PROPOSALS') return false;
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-text">Oportunidades de Transporte</h1>
          <p className="text-sm text-brand-muted">
            Solicitações publicadas por pessoas e empresas aguardando orçamento na Grande São Paulo.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-muted" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs font-semibold rounded-xl border border-brand-border bg-white px-3 py-2 text-brand-text focus:outline-none"
          >
            <option value="all">Todas as Categorias</option>
            <option value="recorrente">Corporativo / Recorrente</option>
            <option value="eventual">Eventual / Aeroporto</option>
            <option value="viagem">Viagens / Excursões</option>
            <option value="escolar_autorizado">Escolar / Crianças</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <EmptyState
          title="Nenhuma solicitação compatível no momento"
          description="Fique atento às notificações. Novas solicitações de clientes são abertas frequentemente."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRequests.map((req) => (
            <Card key={req.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-brand-blue-light text-brand-blue uppercase">
                      {req.category}
                    </span>
                    <span className="text-xs text-brand-muted">Solicitante: {req.clientName} ({req.clientType})</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text mt-1">{req.title}</h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">Faixa de Referência:</span>
                  <p className="text-base font-extrabold text-brand-blue-dark">
                    R$ {req.estimatedBudgetMin?.toLocaleString('pt-BR')} — R$ {req.estimatedBudgetMax?.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Itinerary details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-muted">Origem:</span>
                  <p className="font-semibold text-brand-text flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    <span>{req.origin}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-muted">Destino:</span>
                  <p className="font-semibold text-brand-text flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{req.destination}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-muted">Data & Passageiros:</span>
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

              {/* Additional notes if present */}
              {req.additionalDetails && (
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>Requisitos do cliente:</strong> {req.additionalDetails}
                </p>
              )}

              {/* Bottom bar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-brand-muted">
                  {req.proposalsCount} proposta(s) já enviada(s)
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => openQuoteModal(req)}
                  icon={<Send className="w-4 h-4" />}
                >
                  Enviar Orçamento Comercial
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Proposal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedReq ? `Enviar Orçamento para: ${selectedReq.title}` : 'Enviar Orçamento'}
        maxWidth="lg"
      >
        {submittedSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-brand-text">Orçamento Enviado com Sucesso!</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              O cliente recebeu sua proposta e poderá avaliá-la junto com os dados da sua van e avaliações.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentTab('provider-proposals');
              }}
            >
              Ver Minhas Propostas Enviadas
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSendProposal} className="space-y-4">
            <div className="bg-brand-bg p-3 rounded-xl border border-brand-border text-xs space-y-1">
              <p><strong>Itinerário:</strong> {selectedReq?.origin} ➔ {selectedReq?.destination}</p>
              <p><strong>Passageiros:</strong> {selectedReq?.passengers} pessoas</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Valor Total do Serviço (R$)"
                type="number"
                min={100}
                step={10}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                helperText="Valor líquido a ser recebido pelo serviço"
              />

              <Select
                label="Qual van você utilizará?"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                options={vehicles.map((v) => ({
                  value: v.id,
                  label: `${v.model} (${v.capacity} lug.)`,
                }))}
              />
            </div>

            <Input
              label="Condições Comerciais"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              helperText="Ex: Inclui motorista experiente, combustível, van com ar-condicionado e ida e volta garantidas"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-text uppercase tracking-wider">
                Mensagem ou Diferenciais para o Cliente
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-brand-border p-3 text-xs focus:border-brand-blue focus:outline-none"
                placeholder="Ex: Van com ar-condicionado de teto higienizado, poltronas executivas soft, tomada USB individual..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={<Send className="w-4 h-4" />}>
                Confirmar e Enviar Proposta
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
