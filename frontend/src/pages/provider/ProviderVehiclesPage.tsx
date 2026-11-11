import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Truck, Plus, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProviderVehiclesPage: React.FC = () => {
  const { vehicles, addVehicle, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2023);
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState(19);
  const [color, setColor] = useState('Prata');
  const [airConditioning, setAirConditioning] = useState(true);
  const [accessibilityAdapted, setAccessibilityAdapted] = useState(false);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model || !plate) return;

    // Mask plate for privacy according to Section 4.3 of README 03
    const maskedPlate = plate.length >= 7 
      ? `SP · ${plate.substring(0, 3)}-${plate.charAt(3)}*${plate.substring(5)}`
      : `SP · ${plate}`;

    addVehicle({
      providerId: currentUser.id,
      model,
      year: Number(year),
      plate: maskedPlate,
      capacity: Number(capacity),
      color,
      airConditioning,
      accessibilityAdapted,
      active: true,
    });

    setIsModalOpen(false);
    setModel('');
    setPlate('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-text">Minhas Vans e Frota</h1>
          <p className="text-sm text-brand-muted">
            Veículos cadastrados e habilitados para executar serviços de transporte na Grande SP.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Cadastrar Novo Veículo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vehicles.map((v) => (
          <Card key={v.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
                  <Truck className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-text">{v.model}</h3>
                  <p className="text-xs text-brand-muted">Ano: {v.year} · Cor: {v.color}</p>
                </div>
              </div>

              <Badge variant={v.status === 'APPROVED' ? 'approved' : 'under_review'}>
                {v.status === 'APPROVED' ? 'Habilitado' : 'Em Análise'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-brand-bg rounded-2xl border border-brand-border text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Capacidade:</span>
                <span className="font-extrabold text-brand-text text-sm">{v.capacity} Lugares</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Placa Protegida (LGPD):</span>
                <span className="font-mono font-bold text-brand-text text-sm">{v.plate}</span>
              </div>
            </div>

            {/* Badges for accessibility and air conditioning */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              {v.airConditioning && (
                <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                  ❄️ Ar-condicionado
                </span>
              )}
              {v.accessibilityAdapted && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                  ♿ Adaptada para Acessibilidade
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> CRLV 2026 Regular
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Nova Van na Frota"
        maxWidth="md"
      >
        <form onSubmit={handleAddVehicle} className="space-y-4">
          <Input
            label="Modelo do Veículo"
            placeholder="Ex: Mercedes-Benz Sprinter 516 CDi"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Ano de Fabricação"
              type="number"
              min={2010}
              max={2026}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              required
            />
            <Input
              label="Placa do Veículo"
              placeholder="Ex: BRA4E89"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
              helperText="Exibida mascarada para contratantes"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Capacidade de Passageiros"
              type="number"
              min={8}
              max={25}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              required
            />
            <Input
              label="Cor do Veículo"
              placeholder="Ex: Branca, Prata"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-text">
              <input
                type="checkbox"
                checked={airConditioning}
                onChange={(e) => setAirConditioning(e.target.checked)}
                className="w-4 h-4 text-brand-blue rounded"
              />
              <span>Possui ar-condicionado funcionando</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-text">
              <input
                type="checkbox"
                checked={accessibilityAdapted}
                onChange={(e) => setAccessibilityAdapted(e.target.checked)}
                className="w-4 h-4 text-brand-blue rounded"
              />
              <span>Adaptada para cadeirantes / acessibilidade</span>
            </label>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Enviar para Análise
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
