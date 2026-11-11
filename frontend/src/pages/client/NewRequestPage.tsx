import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Waypoint, TransportCategory } from '../../types';
import {
  MapPin,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Users,
  Calculator,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface NewRequestPageProps {
  setCurrentTab: (tab: string) => void;
}

export const NewRequestPage: React.FC<NewRequestPageProps> = ({ setCurrentTab }) => {
  const { addRequest, calculateEstimate } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TransportCategory>('eventual');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [newWaypointAddress, setNewWaypointAddress] = useState('');
  const [newWaypointPassengers, setNewWaypointPassengers] = useState(2);
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('08:00');
  const [hasReturn, setHasReturn] = useState(false);
  const [returnDate, setReturnDate] = useState('2026-11-25');
  const [returnTime, setReturnTime] = useState('17:00');
  const [passengers, setPassengers] = useState(15);
  const [frequency, setFrequency] = useState<'once' | 'daily' | 'weekly' | 'custom'>('once');
  const [frequencyDetails, setFrequencyDetails] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Add waypoint handler
  const handleAddWaypoint = () => {
    if (!newWaypointAddress.trim()) return;
    const wp: Waypoint = {
      id: `wp-${Date.now()}`,
      address: newWaypointAddress.trim(),
      passengersCount: Number(newWaypointPassengers),
    };
    setWaypoints([...waypoints, wp]);
    setNewWaypointAddress('');
    setNewWaypointPassengers(2);
  };

  const handleRemoveWaypoint = (id: string) => {
    setWaypoints(waypoints.filter((w) => w.id !== id));
  };

  // Real-time Operational Pricing Estimate based on Section 10 of README 01
  const estimatedEstimate = calculateEstimate({
    distanceKm: 35 + waypoints.length * 8,
    hours: frequency === 'daily' ? 160 : 4,
    passengers: Number(passengers),
    waypointsCount: waypoints.length,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date) return;

    addRequest({
      clientId: 'usr-1',
      clientName: 'Empresa Alpha Logística',
      clientType: 'PJ',
      title: title || `Transporte de ${origin.split('-')[0]} para ${destination.split('-')[0]}`,
      category,
      origin,
      destination,
      waypoints,
      date,
      returnDate: hasReturn ? returnDate : undefined,
      time,
      returnTime: hasReturn ? returnTime : undefined,
      passengers: Number(passengers),
      frequency,
      frequencyDetails: frequency !== 'once' ? frequencyDetails : undefined,
      estimatedBudgetMin: estimatedEstimate.min,
      estimatedBudgetMax: estimatedEstimate.max,
      additionalDetails,
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-brand-text">
            Solicitação Publicada com Sucesso!
          </h2>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Sua solicitação já está visível para os motoristas e proprietários de vans credenciados na Grande São Paulo. Assim que receber propostas, você poderá compará-las.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <Button
            variant="primary"
            onClick={() => setCurrentTab('client-requests')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Acompanhar Minhas Solicitações
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Criar Outra Solicitação
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-extrabold text-brand-text">Solicitar Transporte por Van</h1>
        <p className="text-sm text-brand-muted">
          Preencha os dados da viagem para receber orçamentos de motoristas com documentação auditada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Tipo e Trajeto */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-border">
            <span className="w-6 h-6 rounded-lg bg-brand-blue text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-brand-text">Definição do Trajeto e Categoria</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Título ou Identificação do Serviço"
              placeholder="Ex: Transporte colaboradores SP-Guarulhos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Ajuda os motoristas a identificar o objetivo da viagem"
            />
            <Select
              label="Categoria de Transporte"
              value={category}
              onChange={(e) => setCategory(e.target.value as TransportCategory)}
              options={[
                { value: 'eventual', label: 'Transporte Eventual (Passeio / Diária / Aeroporto)' },
                { value: 'recorrente', label: 'Transporte Recorrente (Empresarial / Contrato Fixo)' },
                { value: 'viagem', label: 'Viagem / Excursão (Intermunicipal Grande SP)' },
                { value: 'escolar_autorizado', label: 'Escolar / Institucional (Exige alvará DTP)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Endereço de Origem"
              placeholder="Ex: Av. Paulista, 1000 - Bela Vista, São Paulo"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              leftIcon={<MapPin className="w-4 h-4 text-brand-blue" />}
            />
            <Input
              label="Endereço de Destino Final"
              placeholder="Ex: Aeroporto Internacional de Guarulhos - Terminal 3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
            />
          </div>

          {/* Multiple Boarding Points (Waypoints) as required by Section 9.2 in README 03 */}
          <div className="bg-brand-bg rounded-2xl p-4 border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">
                  Múltiplos Pontos de Embarque (Opcional)
                </h4>
                <p className="text-xs text-brand-muted">
                  Precisa pegar passageiros em endereços intermediários? Adicione abaixo:
                </p>
              </div>
              <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {waypoints.length} paradas
              </span>
            </div>

            {waypoints.length > 0 && (
              <div className="space-y-2 pt-2">
                {waypoints.map((wp, idx) => (
                  <div
                    key={wp.id}
                    className="flex items-center justify-between bg-white p-3 rounded-xl border border-brand-border text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand-yellow-light text-amber-800 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-brand-text">{wp.address}</span>
                      <span className="text-brand-muted">({wp.passengersCount} passageiros)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveWaypoint(wp.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2">
              <div className="sm:col-span-8">
                <input
                  type="text"
                  placeholder="Novo ponto de embarque (Ex: Metrô Tatuapé - Saída Norte)"
                  value={newWaypointAddress}
                  onChange={(e) => setNewWaypointAddress(e.target.value)}
                  className="w-full text-xs rounded-xl border border-brand-border px-3 py-2 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  placeholder="Passageiros"
                  value={newWaypointPassengers}
                  min={1}
                  max={25}
                  onChange={(e) => setNewWaypointPassengers(Number(e.target.value))}
                  className="w-full text-xs rounded-xl border border-brand-border px-3 py-2 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddWaypoint}
                  className="w-full h-full text-xs"
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 2: Datas, Passageiros e Frequência */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-border">
            <span className="w-6 h-6 rounded-lg bg-brand-blue text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-brand-text">Datas, Passageiros e Horários</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Data da Viagem"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              leftIcon={<Calendar className="w-4 h-4 text-brand-muted" />}
            />
            <Input
              label="Horário de Partida"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              leftIcon={<Clock className="w-4 h-4 text-brand-muted" />}
            />
            <Input
              label="Quantidade Total de Passageiros"
              type="number"
              min={1}
              max={30}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              required
              leftIcon={<Users className="w-4 h-4 text-brand-muted" />}
              helperText="Vans comportam de 12 a 21 passageiros"
            />
          </div>

          {/* Return Trip Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-brand-text">
              <input
                type="checkbox"
                checked={hasReturn}
                onChange={(e) => setHasReturn(e.target.checked)}
                className="w-4 h-4 text-brand-blue rounded border-brand-border focus:ring-brand-blue"
              />
              <span>Necessito de retorno (Ida e Volta)</span>
            </label>

            {hasReturn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 bg-brand-bg rounded-2xl border border-brand-border">
                <Input
                  label="Data do Retorno"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  leftIcon={<Calendar className="w-4 h-4 text-brand-muted" />}
                />
                <Input
                  label="Horário do Retorno"
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  leftIcon={<Clock className="w-4 h-4 text-brand-muted" />}
                />
              </div>
            )}
          </div>

          {/* Frequência do Serviço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Select
              label="Frequência do Transporte"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              options={[
                { value: 'once', label: 'Viagem Única (Eventual)' },
                { value: 'daily', label: 'Diário (Segunda a Sexta ou Escala)' },
                { value: 'weekly', label: 'Semanal (Dias específicos)' },
                { value: 'custom', label: 'Personalizado' },
              ]}
            />
            {frequency !== 'once' && (
              <Input
                label="Detalhes da Frequência"
                placeholder="Ex: Seg a Sex, entrada 08h e saída 17h"
                value={frequencyDetails}
                onChange={(e) => setFrequencyDetails(e.target.value)}
              />
            )}
          </div>

          {/* Observações Adicionais */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-bold text-brand-text uppercase tracking-wider">
              Observações e Necessidades Especiais
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-brand-border p-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="Ex: Necessário bagageiro espaçoso, passageiro cadeirante necessita plataforma elevatória, ar-condicionado obrigatório..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
          </div>
        </Card>

        {/* Live Cost Estimate Preview (Formula from README 01) */}
        <div className="bg-brand-blue-light/50 border border-blue-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                Faixa Estimada de Mercado (Base de Referência)
              </p>
              <h4 className="text-2xl font-extrabold text-brand-blue-dark">
                R$ {estimatedEstimate.min.toLocaleString('pt-BR')} — R$ {estimatedEstimate.max.toLocaleString('pt-BR')}
              </h4>
              <p className="text-xs text-brand-muted">
                Calculada por km, tempo de operação, paradas e capacidade. Cada motorista enviará seu orçamento individual.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shadow-md"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Publicar Solicitação
          </Button>
        </div>
      </form>
    </div>
  );
};
