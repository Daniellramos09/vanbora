import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, Calendar, Compass, FileCheck, ShieldCheck } from 'lucide-react';

export const CategoriesPage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">Categorias e Modalidades Atendidas</h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Cada tipo de serviço possui exigências regulatórias específicas no Estado de São Paulo. Conectamos sua demanda somente a veículos habilitados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3 border-t-4 border-t-brand-blue">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-text">Transporte Corporativo e Contratos Fixos</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Ideal para empresas que precisam transportar funcionários em turnos, entre estações de trem/metrô e plantas fabris ou para o Aeroporto de Guarulhos (GRU) e Congonhas (CGH).
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
              Contratos mensais ou semanais
            </span>
          </div>
        </Card>

        <Card className="p-6 space-y-3 border-t-4 border-t-brand-green">
          <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-text">Eventos, Feiras e Congressos</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Transporte eventual para feiras como na São Paulo Expo, Transamérica Expo Center, Anhembi ou eventos corporativos, casamentos e formaturas.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Diárias com motorista exclusivo
            </span>
          </div>
        </Card>

        <Card className="p-6 space-y-3 border-t-4 border-t-brand-yellow">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-light text-amber-700 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-text">Viagens e Excursões Familiares</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Passeios particulares para o litoral paulista (Santos, Guarujá), Rota do Vinho em São Roque, Santuário de Aparecida, Holambra e circuitos turísticos.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Ida e volta garantidas
            </span>
          </div>
        </Card>

        <Card className="p-6 space-y-3 border-t-4 border-t-purple-500">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-text">Escolar & Atividades Extracurriculares</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Visitas a museus, competições esportivas e passeios pedagógicos de colégios. Exclusivamente operado por motoristas com alvará DTP escolar ativo e monitor registrado.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
              Conformidade rigorosa DTP / CTB
            </span>
          </div>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Button size="lg" variant="primary" onClick={() => setCurrentTab('new-request')}>
          Publicar Solicitação em Qualquer Categoria
        </Button>
      </div>
    </div>
  );
};
