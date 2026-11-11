import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  Truck,
  FileCheck2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';

interface AdminDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentTab }) => {
  const { requests, documents, vehicles, bookings, reviewDocument } = useApp();

  const pendingDocs = documents.filter((d) => d.status === 'UNDER_REVIEW');
  const approvedDocs = documents.filter((d) => d.status === 'APPROVED');
  const totalVolume = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-text">Painel de Supervisão e Auditoria</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Módulo Regulatório
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            Monitore cadastros, vistorias de vans, conformidade legal e transações na Grande São Paulo.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setCurrentTab('admin-documents')}
          icon={<FileCheck2 className="w-4 h-4" />}
        >
          Fila de Documentos ({pendingDocs.length})
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Documentos Pendentes</p>
            <h3 className="text-2xl font-extrabold text-amber-600">{pendingDocs.length}</h3>
            <p className="text-[10px] text-brand-muted">Exigem análise humana</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Vans na Plataforma</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{vehicles.length}</h3>
            <p className="text-[10px] text-emerald-600 font-semibold">100% com documentação em dia</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Viagens Fechadas</p>
            <h3 className="text-2xl font-extrabold text-brand-text">{bookings.length}</h3>
            <p className="text-[10px] text-brand-muted">Serviços formalizados</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-light text-amber-700 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-muted">Volume Transacionado</p>
            <h3 className="text-xl font-extrabold text-brand-text">R$ {totalVolume.toLocaleString('pt-BR')}</h3>
            <p className="text-[10px] text-brand-muted">Contratos gerados</p>
          </div>
        </Card>
      </div>

      {/* Immediate Document Review Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-text">Fila de Validação Documental</h2>
            <p className="text-xs text-brand-muted">
              Certidões, CNHs profissionais e laudos veiculares que aguardam aprovação para liberação de propostas.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('admin-documents')}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingDocs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-brand-border">
            <CheckCircle className="w-10 h-10 text-brand-green mx-auto mb-2" />
            <h4 className="font-bold text-brand-text">Nenhum documento pendente na fila</h4>
            <p className="text-xs text-brand-muted">Todos os cadastros e vistorias estão auditados em dia.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDocs.map((doc) => (
              <Card key={doc.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="under_review">Aguardando Análise</Badge>
                    <span className="text-xs font-bold text-brand-muted">Prestador: {doc.providerName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-brand-text">{doc.title}</h4>
                  <p className="text-xs text-slate-500 font-mono">Arquivo: {doc.fileName} · Vencimento: {doc.validUntil || 'Indeterminado'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-rose-200 text-rose-700 hover:bg-rose-50"
                    onClick={() => {
                      const reason = prompt('Informe o motivo da recusa ou pendência:') || 'Documento ilegível ou vencido';
                      reviewDocument(doc.id, 'CORRECTION_REQUIRED', reason);
                    }}
                    icon={<XCircle className="w-4 h-4" />}
                  >
                    Solicitar Correção
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => reviewDocument(doc.id, 'APPROVED')}
                    icon={<CheckCircle className="w-4 h-4" />}
                  >
                    Aprovar Documento
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
