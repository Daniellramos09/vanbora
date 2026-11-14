import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Waypoint, TransportCategory } from '../../types';
import { VanLogoIcon } from '../../components/illustrations/VanLogoIcon';
import { AuditStampIllustration } from '../../components/illustrations/AuditStampIllustration';
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
  Sparkles,
  Heart,
  Shield,
  HelpCircle,
  Eye,
  Navigation,
} from 'lucide-react';

interface NewRequestPageProps {
  setCurrentTab: (tab: string) => void;
}

interface RoutePreset {
  id: string;
  label: string;
  title: string;
  category: TransportCategory;
  origin: string;
  destination: string;
  passengers: number;
  hasReturn: boolean;
  notes: string;
  waypoints?: Waypoint[];
}

const ROUTE_PRESETS: RoutePreset[] = [
  {
    id: 'sitio',
    label: '🌿 Sítio no Sábado (Família)',
    title: 'Passeio em Família para Sítio em Mairiporã',
    category: 'viagem',
    origin: 'Penha (Zona Leste) - São Paulo, SP',
    destination: 'Sítio & Chácara Recanto Verde - Mairiporã, SP',
    passengers: 15,
    hasReturn: true,
    notes: 'Ida de manhã e retorno no fim da tarde. Van com ar-condicionado e espaço para cooler e bolsas.',
    waypoints: [
      { id: 'wp-pre-1', address: 'Metrô Tatuapé (Saída Shopping)', passengersCount: 4 },
    ],
  },
  {
    id: 'criancas',
    label: '🎈 Festa Infantil / Buffet',
    title: 'Levar as Crianças para Aniversário no Buffet',
    category: 'escolar_autorizado',
    origin: 'Santana (Zona Norte) - São Paulo, SP',
    destination: 'Buffet Infantil Planeta da Alegria - Tatuapé, SP',
    passengers: 12,
    hasReturn: true,
    notes: 'Crianças pequenas com mães e monitora. Cinto em todos os bancos obrigatório.',
  },
  {
    id: 'aeroporto',
    label: '✈️ Aeroporto GRU com Malas',
    title: 'Traslado Família e Malas para Aeroporto de Guarulhos',
    category: 'eventual',
    origin: 'Vila Mariana (Zona Sul) - São Paulo, SP',
    destination: 'Aeroporto Internacional de Guarulhos (GRU) - Terminal 2',
    passengers: 9,
    hasReturn: false,
    notes: 'Voo internacional com muitas malas grandes. Necessário bagageiro espaçoso e pontualidade.',
  },
  {
    id: 'praia',
    label: '🌊 Bate-e-Volta na Praia',
    title: 'Passeio com Amigos para Praia Grande',
    category: 'viagem',
    origin: 'Ipiranga - São Paulo, SP',
    destination: 'Canto do Forte - Praia Grande, SP',
    passengers: 16,
    hasReturn: true,
    notes: 'Ida 07h da manhã e volta às 18h. Grupo de amigos e família reunidos.',
  },
];

export const NewRequestPage: React.FC<NewRequestPageProps> = ({ setCurrentTab }) => {
  const { addRequest, calculateEstimate, currentUser, setRole } = useApp();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TransportCategory>('eventual');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [newWaypointAddress, setNewWaypointAddress] = useState('');
  const [newWaypointPassengers, setNewWaypointPassengers] = useState(2);
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('08:00');
  const [hasReturn, setHasReturn] = useState(true);
  const [returnDate, setReturnDate] = useState('2026-11-28');
  const [returnTime, setReturnTime] = useState('18:00');
  const [passengers, setPassengers] = useState(15);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdRequestId, setCreatedRequestId] = useState<string>('');

  // Handle Preset selection
  const handleApplyPreset = (preset: RoutePreset) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setOrigin(preset.origin);
    setDestination(preset.destination);
    setPassengers(preset.passengers);
    setHasReturn(preset.hasReturn);
    setAdditionalDetails(preset.notes);
    if (preset.waypoints) {
      setWaypoints(preset.waypoints);
    } else {
      setWaypoints([]);
    }
  };

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

  // Distance estimation based on stops & return
  const estimatedDistanceKm = (hasReturn ? 75 : 40) + waypoints.length * 10;
  const estimatedHours = hasReturn ? 8 : 3;

  // Real-time Fair Operational Pricing Estimate
  const estimate = calculateEstimate({
    distanceKm: estimatedDistanceKm,
    hours: estimatedHours,
    passengers: Number(passengers),
    waypointsCount: waypoints.length,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim() || !date) return;

    const newReq = addRequest({
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientType: currentUser.clientType || 'PF',
      title: title.trim() || `Passeio de ${origin.split('-')[0].trim()} para ${destination.split('-')[0].trim()}`,
      category,
      origin: origin.trim(),
      destination: destination.trim(),
      waypoints,
      date,
      returnDate: hasReturn ? returnDate : undefined,
      time,
      returnTime: hasReturn ? returnTime : undefined,
      passengers: Number(passengers),
      frequency: 'once',
      estimatedBudgetMin: estimate.suggested,
      estimatedBudgetMax: estimate.suggested,
      additionalDetails,
    });

    setCreatedRequestId(newReq.id);
    setIsSubmitted(true);
    toast.success('Viagem Publicada no Radar!', 'Motoristas habilitados na sua região já podem visualizar a solicitação.');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-brand-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Solicitação #{createdRequestId} no Radar
          </span>
          <h2 className="text-3xl font-black text-brand-ink">
            Viagem Publicada com Sucesso!
          </h2>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Sua solicitação de van já está visível para os motoristas da sua região na Grande São Paulo com o valor justo calculado de{' '}
            <strong className="text-brand-ink">R$ {estimate.suggested.toLocaleString('pt-BR')}</strong>.
          </p>
        </div>

        {/* Boarding Preview Box */}
        <div className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-6 shadow-towel text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-brand-muted pb-2 border-b border-brand-border">
            <span>RESUMO DA VIAGEM</span>
            <span className="text-brand-green font-extrabold">Preço Justo Garantido</span>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-bold text-brand-ink text-sm">{title || 'Passeio em Grupo'}</p>
            <div className="flex items-center gap-2 text-brand-muted">
              <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span>Embarque: {origin}</span>
            </div>
            {waypoints.map((w, i) => (
              <div key={w.id} className="flex items-center gap-2 text-brand-muted pl-3">
                <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                <span>Parada {i + 1}: {w.address} ({w.passengersCount} pess.)</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-brand-muted">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>Destino: {destination}</span>
            </div>
            <div className="flex items-center gap-4 text-brand-ink pt-1 font-semibold">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-muted" />
                {date} ({time})
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-muted" />
                {passengers} passageiros
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Button
            variant="primary"
            onClick={() => setCurrentTab('client-requests')}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Acompanhar em Minhas Solicitações
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              // Quick demo peek: switch role to provider so user can see it on the driver radar
              setRole('provider');
              setCurrentTab('provider-requests');
            }}
            icon={<Eye className="w-4 h-4 text-amber-700" />}
            className="w-full sm:w-auto"
          >
            Ver como o Motorista vê no Radar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title Header */}
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs font-black uppercase tracking-wider text-brand-blue bg-brand-blue-soft px-3 py-1 rounded-full">
          Calculadora de Viagem & Nova Solicitação
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
          Planeje sua viagem em grupo
        </h1>
        <p className="text-sm text-brand-muted max-w-2xl leading-relaxed">
          Informe o trajeto, data e passageiros. O VanBora calcula na hora o valor justo pelo percurso para você contratar direto com motoristas parceiros da sua região.
        </p>
      </div>

      {/* Quick Presets / Atalhos de Rotas Frequentes */}
      <div className="bg-brand-surface rounded-3xl border-2 border-brand-border-strong p-5 shadow-towel space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-ink">
              Atalhos de Rotas Frequentes (Preenchimento Rápido com 1 Clique)
            </h3>
          </div>
          <span className="text-[11px] text-brand-muted hidden sm:inline">Economize tempo</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ROUTE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-3.5 py-2 rounded-2xl bg-brand-canvas hover:bg-[#F2ECE1] border border-brand-border text-xs font-bold text-brand-ink transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs hover:border-brand-border-strong"
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Trajeto & Paradas */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-brand-blue text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-extrabold text-brand-ink">
                Trajeto do Passeio & Paradas
              </h3>
            </div>
            <span className="text-xs text-brand-muted font-medium">Grande São Paulo e Região</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome ou Identificação do Passeio"
              placeholder="Ex: Passeio da Família no Sítio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Ex: Aniversário da Sofia, Excursão de Amigos, etc."
            />

            <Select
              label="Modalidade do Transporte"
              value={category}
              onChange={(e) => setCategory(e.target.value as TransportCategory)}
              options={[
                { value: 'viagem', label: '🌿 Passeio / Sítio / Excursão (Fim de Semana)' },
                { value: 'eventual', label: '✈️ Traslado / Aeroporto / Diária' },
                { value: 'escolar_autorizado', label: '🎈 Crianças / Aniversário / Buffet' },
                { value: 'recorrente', label: '🏢 Transporte Recorrente / Contrato Fixo' },
              ]}
            />
          </div>

          {/* Route Inputs with Visual Line */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Ponto de Embarque Inicial (Origem)"
                placeholder="Ex: Rua Emílio Mallet, 800 - Tatuapé, São Paulo"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
                leftIcon={<MapPin className="w-4 h-4 text-brand-blue" />}
              />

              <Input
                label="Destino Final do Passeio"
                placeholder="Ex: Estrada do Vinho, km 5 - São Roque, SP"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
              />
            </div>

            {/* Múltiplos Pontos de Embarque (Waypoints) */}
            <div className="bg-brand-canvas rounded-2xl p-4 sm:p-5 border border-brand-border space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-brand-ink uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Precisa buscar gente em mais de um lugar do bairro?</span>
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Adicione paradas intermediárias para o motorista saber onde recolher o restante da turma.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                  {waypoints.length} {waypoints.length === 1 ? 'parada' : 'paradas'}
                </span>
              </div>

              {waypoints.length > 0 && (
                <div className="space-y-2 pt-1">
                  {waypoints.map((wp, idx) => (
                    <div
                      key={wp.id}
                      className="flex items-center justify-between bg-white p-3 rounded-2xl border border-brand-border text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-brand-yellow/20 text-amber-900 font-extrabold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-brand-ink">{wp.address}</p>
                          <p className="text-[11px] text-brand-muted">Embarque de {wp.passengersCount} pessoas</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveWaypoint(wp.id)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remover parada"
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
                    placeholder="Endereço ou ponto de referência (Ex: Metrô Penha - Saída Norte)"
                    value={newWaypointAddress}
                    onChange={(e) => setNewWaypointAddress(e.target.value)}
                    className="w-full text-xs rounded-xl border border-brand-border px-3 py-2.5 bg-white text-brand-ink placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    placeholder="Pessoas"
                    value={newWaypointPassengers}
                    min={1}
                    max={20}
                    onChange={(e) => setNewWaypointPassengers(Number(e.target.value))}
                    className="w-full text-xs rounded-xl border border-brand-border px-3 py-2.5 bg-white text-brand-ink focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddWaypoint}
                    className="w-full h-full text-xs py-2.5"
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 2: Datas, Horários e Passageiros */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-brand-blue text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-extrabold text-brand-ink">
                Data, Horários e Quantidade de Lugares
              </h3>
            </div>
            <span className="text-xs text-brand-muted font-medium">Van com cinto para todos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Data da Viagem / Ida"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              leftIcon={<Calendar className="w-4 h-4 text-brand-muted" />}
            />
            <Input
              label="Horário de Saída"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              leftIcon={<Clock className="w-4 h-4 text-brand-muted" />}
            />
            <Input
              label="Total de Passageiros"
              type="number"
              min={1}
              max={25}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              required
              leftIcon={<Users className="w-4 h-4 text-brand-muted" />}
              helperText="Vans padrão comportam 15 a 19 lugares"
            />
          </div>

          {/* Return Trip Checkbox */}
          <div className="p-4 bg-brand-canvas rounded-2xl border border-brand-border space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-bold text-brand-ink select-none">
              <input
                type="checkbox"
                checked={hasReturn}
                onChange={(e) => setHasReturn(e.target.checked)}
                className="w-4 h-4 text-brand-blue rounded border-brand-border focus:ring-brand-blue"
              />
              <span>Viagem com Ida e Volta Garantidas (Passeio Completo)</span>
            </label>

            {hasReturn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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

          {/* Observações Adicionais */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
              Observações Especiais para o Motorista (Opcional)
            </label>
            <textarea
              rows={2}
              className="w-full rounded-2xl border border-brand-border p-3 text-xs focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-brand-canvas text-brand-ink"
              placeholder="Ex: Temos 2 idosos no grupo, crianças levarão mochilas, precisamos de espaço para cooler..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
          </div>
        </Card>

        {/* Step 3: LIVE FAIR PRICE CALCULATOR (Cálculo do Site) */}
        <div className="bg-[#FAF6EE] rounded-3xl border-2 border-brand-border-strong p-6 sm:p-8 shadow-towel space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-ink text-brand-yellow flex items-center justify-center flex-shrink-0 shadow-sm">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-brand-yellow px-2.5 py-0.5 rounded-full">
                  Preço Justo Calculado pelo Site
                </span>
                <h3 className="text-xl font-extrabold text-brand-ink mt-0.5">
                  Valor Transparente da Viagem
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right bg-white p-3.5 rounded-2xl border border-brand-border shadow-2xs">
              <span className="text-[10px] font-extrabold uppercase text-brand-muted block">
                Valor Total da Van:
              </span>
              <p className="text-3xl font-black text-brand-ink">
                R$ {estimate.suggested.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-brand-green font-extrabold mt-0.5">
                Apenas ~R$ {estimate.pricePerPerson} por pessoa ({passengers} pessoas)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-brand-ink font-medium">
            <div className="p-3 bg-white rounded-2xl border border-brand-border space-y-1">
              <p className="font-bold text-brand-muted uppercase text-[10px]">Quilometragem Estimada</p>
              <p className="text-sm font-extrabold text-brand-ink">~{estimatedDistanceKm} km percurso</p>
              <p className="text-[11px] text-brand-muted">Combustível e desgaste inclusos</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-brand-border space-y-1">
              <p className="font-bold text-brand-muted uppercase text-[10px]">Tempo de Disponibilidade</p>
              <p className="text-sm font-extrabold text-brand-ink">~{estimatedHours} horas de van</p>
              <p className="text-[11px] text-brand-muted">Espera no local combinada</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-brand-border space-y-1">
              <p className="font-bold text-brand-muted uppercase text-[10px]">Garantias do VanBora</p>
              <p className="text-sm font-extrabold text-brand-green">Sem leilão nem surpresas</p>
              <p className="text-[11px] text-brand-muted">Motorista aceita pelo valor fixo</p>
            </div>
          </div>

          {/* Submission CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-muted text-center sm:text-left max-w-md">
              Ao publicar, sua viagem aparece no radar dos motoristas autônomos da sua região na Grande SP.
            </p>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 shadow-towel"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Publicar Viagem por R$ {estimate.suggested.toLocaleString('pt-BR')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
