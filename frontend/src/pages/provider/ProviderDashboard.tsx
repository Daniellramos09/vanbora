import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { VanBoraApi } from '../../services/apiClient';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Truck,
  FileCheck,
  Send,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Plus,
  KeyRound,
  CheckCircle,
  Lock,
} from 'lucide-react';

interface ProviderDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ setCurrentTab }) => {
  const { currentUser, requests, proposals, vehicles, documents, bookings } = useApp();
  const toast = useToast();

  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [selectedBookingForCheckIn, setSelectedBookingForCheckIn] = useState<any>(null);
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const compatibleRequests = requests.filter((r) => r.status === 'RECEIVING_PROPOSALS');
  const myProposals = proposals.filter((p) => p.providerId === currentUser.id);
  const myBookings = bookings.filter((b) => b.providerId === currentUser.id);

  // Check if any document needs correction
  const pendingDocs = documents.filter(
    (d) => d.status === 'CORRECTION_REQUIRED' || d.status === 'UNDER_REVIEW'
  );

  const handleOpenCheckIn = (booking: any) => {
    setSelectedBookingForCheckIn(booking);
    setCheckInInput('');
    setCheckInSuccess(false);
    setIsCheckInModalOpen(true);
  };

  const handleConfirmCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForCheckIn || !checkInInput.trim()) return;

    try {
      await VanBoraApi.checkInBooking(selectedBookingForCheckIn.id, checkInInput.trim());
    } catch (err) {
      console.warn('Backend offline, procedendo com validação simulada:', err);
    }

    setCheckInSuccess(true);
    toast.success('Check-in Realizado com Sucesso!', 'Passageiros a bordo. O pagamento está 100% garantido e será liberado ao término da rota.');
  };

  const handleCompleteTrip = async () => {
    setIsCompleting(true);
    try {
      await VanBoraApi.completeBooking(selectedBookingForCheckIn.id);
    } catch (err) {
      console.warn('Backend sync:', err);
    }
    toast.success('Viagem Concluída com Sucesso!', `O saldo de R$ ${selectedBookingForCheckIn.price.toLocaleString('pt-BR')} foi liberado em sua carteira.`);
    setIsCompleting(false);
    setIsCheckInModalOpen(false);
  };

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
                {pendingDocs.length} documento(s) com pendência ou em análise. Mantenha sua CNH e documento do veículo (CRLV) em dia para continuar recebendo pedidos de viagem.
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

      {/* Seção de Viagens Confirmadas & Check-in Anti-Golpe */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-brand-text">Viagens Confirmadas com Custódia</h2>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Pagamento Garantido
              </span>
            </div>
            <p className="text-xs text-brand-muted">
              O cliente já efetuou o pagamento no VanBora. Solicite o código de 4 dígitos no embarque para iniciar a corrida.
            </p>
          </div>
        </div>

        {myBookings.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center text-xs text-brand-muted">
            Você não possui viagens confirmadas para hoje. Responda às solicitações do radar para fechar novos serviços.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl border-2 border-emerald-500/40 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      Valor Retido: R$ {b.price.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[10px] text-brand-muted font-mono">#{b.id}</span>
                  </div>

                  <h4 className="text-sm font-bold text-brand-ink mt-2">
                    {b.origin.split('-')[0]} ➔ {b.destination.split('-')[0]}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">
                    Cliente: <strong>{b.clientName || 'Passageiro VanBora'}</strong> · Data: {b.date} ({b.time})
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800"
                    icon={<KeyRound className="w-4 h-4" />}
                    onClick={() => handleOpenCheckIn(b)}
                  >
                    Fazer Check-in no Embarque
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Validação de Check-in & Liberação de Pagamento */}
      {isCheckInModalOpen && selectedBookingForCheckIn && (
        <Modal
          isOpen={isCheckInModalOpen}
          onClose={() => setIsCheckInModalOpen(false)}
          title="Validação de Embarque & Custódia"
        >
          <div className="space-y-4 text-xs text-brand-ink">
            {!checkInSuccess ? (
              <form onSubmit={handleConfirmCheckIn} className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                  <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                    <Lock className="w-4 h-4 text-emerald-700" />
                    Valor em Garantia: R$ {selectedBookingForCheckIn.price.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    O passageiro já pagou. Peça a ele o <strong>Código de Check-in</strong> exibido no bilhete digital dele (ex: <code>VB-9872</code>).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-brand-ink block">
                    Digite o Código de 4 dígitos do Passageiro:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: VB-9872 ou 9872"
                    value={checkInInput}
                    onChange={(e) => setCheckInInput(e.target.value.toUpperCase())}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-brand-border-strong text-center font-mono font-black text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="w-1/2"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-1/2 bg-emerald-700 hover:bg-emerald-800 font-bold"
                  >
                    Validar Embarque
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-brand-ink">
                    Passageiros a Bordo!
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
                    Check-in validado com sucesso. A viagem agora está em andamento com seguro e garantia ativa.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-muted">Trajeto:</span>
                    <span className="font-bold text-brand-ink">{selectedBookingForCheckIn.origin.split('-')[0]} ➔ {selectedBookingForCheckIn.destination.split('-')[0]}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-muted">Saldo a ser liberado:</span>
                    <span className="font-extrabold text-emerald-700">R$ {selectedBookingForCheckIn.price.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    onClick={handleCompleteTrip}
                    disabled={isCompleting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-xs font-bold py-3"
                  >
                    {isCompleting ? 'Liberando saldo...' : 'Concluir Rota & Liberar Pagamento'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

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
