import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Truck, ShieldCheck, CheckCircle2, User, Phone, MapPin } from 'lucide-react';

export const AdminProvidersPage: React.FC = () => {
  const { vehicles, documents } = useApp();

  const providers = [
    {
      id: 'prov-1',
      name: 'Carlos Eduardo Ramos (Transportes Ramos)',
      city: 'São Paulo (Zona Leste / Centro)',
      phone: '(11) 99123-8877',
      status: 'APPROVED',
      trips: 142,
      rating: 4.9,
    },
    {
      id: 'prov-2',
      name: 'TransPaulista Fretamento & Turismo Ltda',
      city: 'São Paulo (Zona Sul / Faria Lima)',
      phone: '(11) 98111-2233',
      status: 'APPROVED',
      trips: 290,
      rating: 4.8,
    },
    {
      id: 'prov-3',
      name: 'Marcos Vinícius Silva (Van Express ABC)',
      city: 'Santo André / Grande SP',
      phone: '(11) 97654-3210',
      status: 'UNDER_REVIEW',
      trips: 0,
      rating: 5.0,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">Gestão de Prestadores e Frotas</h1>
        <p className="text-sm text-brand-muted">
          Supervisão de motoristas autônomos e transportadoras credenciadas na Grande São Paulo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {providers.map((p) => {
          const providerVehicles = vehicles.filter((v) => v.providerId === p.id);
          const providerDocs = documents.filter((d) => d.providerId === p.id);
          const allDocsApproved = providerDocs.every((d) => d.status === 'APPROVED');

          return (
            <Card key={p.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-text">{p.name}</h3>
                    <p className="text-xs text-brand-muted flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {p.city}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {p.phone}
                      </span>
                    </p>
                  </div>
                </div>

                <Badge variant={p.status === 'APPROVED' ? 'approved' : 'under_review'}>
                  {p.status === 'APPROVED' ? 'Ativo e Habilitado' : 'Em Análise de Documentos'}
                </Badge>
              </div>

              {/* Vehicles & Compliance Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-brand-bg p-3.5 rounded-2xl border border-brand-border">
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">Vans Cadastradas:</span>
                  <span className="font-semibold text-brand-text">{providerVehicles.length || 1} veículo(s)</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">Documentação:</span>
                  <span className={allDocsApproved ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                    {providerDocs.length} documentos ({providerDocs.filter(d => d.status === 'APPROVED').length} aprovados)
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">Histórico Operacional:</span>
                  <span className="font-semibold text-brand-text">{p.trips} viagens realizadas · Nota {p.rating}★</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
