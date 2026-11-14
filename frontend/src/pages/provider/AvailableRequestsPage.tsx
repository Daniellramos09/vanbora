import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { VanBoraApi } from '../../services/apiClient';
import { TransportRequest, Vehicle } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import { VanLogoIcon } from '../../components/illustrations/VanLogoIcon';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Filter,
  Navigation,
  ArrowRight,
  Clock,
  Sparkles,
  Heart,
} from 'lucide-react';

interface AvailableRequestsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AvailableRequestsPage: React.FC<AvailableRequestsPageProps> = ({ setCurrentTab }) => {
  const { requests, vehicles, currentUser, addProposal } = useApp();
  const toast = useToast();

  const [backendRequests, setBackendRequests] = useState<TransportRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<TransportRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Busca viagens reais direto do PostgreSQL via Spring Boot
  useEffect(() => {
    let isMounted = true;
    async function loadRadarTrips() {
      const res = await VanBoraApi.getRadarRequests();
      if (res.data && Array.isArray(res.data) && isMounted) {
        const mapped: TransportRequest[] = res.data.map((item: any) => ({
          id: item.id,
          clientId: item.customerId,
          clientName: item.customerName || 'Cliente VanBora',
          clientType: 'PF',
          title: item.title,
          category: (item.category || 'VIAGEM').toLowerCase() as any,
          origin: item.origin,
          destination: item.destination,
          waypoints: (item.waypoints || []).map((w: any) => ({
            id: w.id,
            address: w.address,
            passengersCount: w.passengersCount,
          })),
          date: item.departureAt ? item.departureAt.split('T')[0] : '2026-11-20',
          time: item.departureAt && item.departureAt.includes('T') ? item.departureAt.split('T')[1].substring(0, 5) : '08:00',
          returnDate: item.returnAt ? item.returnAt.split('T')[0] : undefined,
          returnTime: item.returnAt && item.returnAt.includes('T') ? item.returnAt.split('T')[1].substring(0, 5) : undefined,
          passengers: item.passengers,
          frequency: 'once',
          estimatedBudgetMin: item.estimatedPrice,
          estimatedBudgetMax: item.estimatedPrice,
          additionalDetails: item.additionalDetails,
          status: 'RECEIVING_PROPOSALS',
          createdAt: item.createdAt,
          proposalsCount: 0,
        }));
        setBackendRequests(mapped);
      }
    }
    loadRadarTrips();
    return () => {
      isMounted = false;
    };
  }, []);

  const openAcceptModal = (req: TransportRequest) => {
    setSelectedReq(req);
    setIsModalOpen(true);
    setSubmittedSuccess(false);
  };

  const handleConfirmTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    const chosenVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
    const tripPrice = selectedReq.estimatedBudgetMin || 680;

    // Se a viagem for do backend, tenta registrar a proposta no backend
    try {
      await VanBoraApi.submitProposal(currentUser.id, {
        requestId: selectedReq.id,
        vehicleId: chosenVehicle?.id,
        price: tripPrice,
        conditions: 'Ida e volta garantidas, van com ar-condicionado e pontualidade no horário combinado.',
        notes: 'Motorista local disponível para atender o grupo com carinho e tranquilidade.',
      });
    } catch (err) {
      console.warn('Backend sync error:', err);
    }

    addProposal({
      requestId: selectedReq.id,
      providerId: currentUser.id,
      providerName: currentUser.name,
      providerRating: 4.9,
      providerTripsCount: 145,
      vehicleId: chosenVehicle?.id || 'v1',
      vehicleModel: chosenVehicle?.model || 'Mercedes Sprinter',
      vehicleCapacity: chosenVehicle?.capacity || 15,
      price: tripPrice,
      conditions: 'Ida e volta garantidas, van com ar-condicionado e pontualidade no horário combinado.',
      notes: 'Motorista local disponível para atender o grupo com carinho e tranquilidade.',
    });

    setSubmittedSuccess(true);
    toast.success('Disponibilidade Registrada!', 'O cliente foi notificado com o seu compromisso de atendimento.');
  };

  // Junta viagens do mock com viagens reais vindas do PostgreSQL (evitando duplicar IDs)
  const allAvailableRequests = [
    ...backendRequests,
    ...requests.filter((r) => !backendRequests.some((br) => br.id === r.id)),
  ];

  const filteredRequests = allAvailableRequests.filter((r) => {
    if (r.status !== 'RECEIVING_PROPOSALS') return false;
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-brand-yellow px-3 py-1 rounded-full">
            Radar de Viagens Disponíveis
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">
            Oportunidades para o Fim de Semana
          </h1>
          <p className="text-sm text-brand-muted">
            Passeios e viagens em grupo na Grande São Paulo com valor já calculado pelo site.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-muted" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs font-extrabold rounded-full border border-brand-border bg-white px-4 py-2.5 text-brand-ink focus:outline-none shadow-2xs"
          >
            <option value="all">Todas as Modalidades</option>
            <option value="viagem">🌿 Sítios e Passeios</option>
            <option value="eventual">✈️ Aeroportos & Traslados</option>
            <option value="escolar_autorizado">🎈 Crianças e Aniversários</option>
            <option value="recorrente">🏢 Empresas e Eventos</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <EmptyState
          title="Nenhuma solicitação aberta no momento"
          description="Novas solicitações de famílias e grupos chegam frequentemente. Fique de olho no radar!"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredRequests.map((req) => {
            const fairPrice = req.estimatedBudgetMin || 680;
            return (
              <div
                key={req.id}
                className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-6 shadow-towel space-y-4 transition-all hover:shadow-towel-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-brand-blue-soft text-brand-blue uppercase">
                        {req.category === 'viagem'
                          ? 'Passeio / Sítio'
                          : req.category === 'escolar_autorizado'
                          ? 'Crianças / Festa'
                          : 'Traslado'}
                      </span>
                      <span className="text-xs text-brand-muted font-medium">
                        Solicitante: <strong className="text-brand-ink">{req.clientName}</strong>
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-brand-ink mt-1">{req.title}</h3>
                  </div>

                  {/* Calculated Fair Price Badge */}
                  <div className="text-left sm:text-right bg-[#FAF6EE] px-4 py-2.5 rounded-2xl border border-brand-border">
                    <span className="text-[10px] uppercase font-bold text-brand-muted block">
                      Valor a Receber pelo Serviço:
                    </span>
                    <p className="text-2xl font-black text-brand-ink">
                      R$ {fairPrice.toLocaleString('pt-BR')}
                    </p>
                    <span className="text-[10px] text-brand-green font-bold">
                      Preço justo definido pelo site
                    </span>
                  </div>
                </div>

                {/* Itinerary details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-brand-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                      Embarque Inicial:
                    </span>
                    <p className="font-bold text-brand-ink">{req.origin}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-brand-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      Destino do Passeio:
                    </span>
                    <p className="font-bold text-brand-ink">{req.destination}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-brand-muted">Data e Turma:</span>
                    <div className="space-y-0.5 font-bold text-brand-ink">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-muted" />
                        <span>{req.date} ({req.time})</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-brand-muted font-medium">
                        <Users className="w-3.5 h-3.5" />
                        <span>{req.passengers} passageiros sentados</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Waypoints if present */}
                {req.waypoints && req.waypoints.length > 0 && (
                  <div className="p-3 bg-brand-canvas rounded-2xl border border-brand-border text-xs space-y-1">
                    <p className="font-bold text-brand-ink flex items-center gap-1 text-[11px] uppercase tracking-wide">
                      <Navigation className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>{req.waypoints.length} Parada(s) Intermediária(s) no Trajeto:</span>
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {req.waypoints.map((w, idx) => (
                        <span
                          key={w.id}
                          className="px-2.5 py-1 rounded-xl bg-white border border-brand-border text-[11px] text-brand-muted font-medium"
                        >
                          P{idx + 1}: {w.address} ({w.passengersCount} pess.)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional notes if present */}
                {req.additionalDetails && (
                  <p className="text-xs text-brand-muted bg-brand-canvas p-3 rounded-2xl border border-brand-border">
                    <strong className="text-brand-ink">Observação do passageiro:</strong> {req.additionalDetails}
                  </p>
                )}

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>Sem leilão · Valor fixo de R$ {fairPrice.toLocaleString('pt-BR')}</span>
                  </div>

                  <Button
                    size="md"
                    variant="primary"
                    onClick={() => openAcceptModal(req)}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Aceitar Viagem por R$ {fairPrice.toLocaleString('pt-BR')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedReq ? `Aceitar Corrida: ${selectedReq.title}` : 'Aceitar Viagem'}
        maxWidth="lg"
      >
        {submittedSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-brand-ink">
              Viagem Confirmada com Sucesso!
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
              Você aceitou a corrida pelo valor de{' '}
              <strong className="text-brand-ink">
                R$ {selectedReq?.estimatedBudgetMin?.toLocaleString('pt-BR') || '680'}
              </strong>. Os detalhes do passageiro foram registrados e o horário está reservado para a sua van.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentTab('provider-proposals');
                }}
              >
                Ver Minhas Viagens Aceitas
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmTrip} className="space-y-5">
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-brand-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-muted uppercase text-[10px]">Resumo do Trajeto</span>
                <span className="font-black text-brand-ink text-sm">
                  R$ {selectedReq?.estimatedBudgetMin?.toLocaleString('pt-BR') || '680'}
                </span>
              </div>
              <p className="text-brand-ink font-semibold">
                {selectedReq?.origin} ➔ {selectedReq?.destination}
              </p>
              <p className="text-brand-muted">
                Data: {selectedReq?.date} às {selectedReq?.time} · {selectedReq?.passengers} passageiros
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
                Qual das suas vans você utilizará?
              </label>
              <Select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                options={vehicles.map((v) => ({
                  value: v.id,
                  label: `${v.model} (${v.capacity} Lugares - Placa ${v.plate})`,
                }))}
              />
            </div>

            <div className="p-3 bg-brand-canvas rounded-2xl border border-brand-border text-xs text-brand-muted space-y-1">
              <p className="font-bold text-brand-ink">Compromisso do motorista parceiro:</p>
              <p>✓ Pontualidade no ponto de embarque combinado</p>
              <p>✓ Van higienizada com ar-condicionado e cinto para todos</p>
              <p>✓ Cuidado e tranquilidade com a família e crianças</p>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Voltar
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={<CheckCircle2 className="w-4 h-4" />}>
                Confirmar e Aceitar Viagem
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
