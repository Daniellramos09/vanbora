import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ProviderDocument, DocumentStatus } from '../../types';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck2,
  Filter,
} from 'lucide-react';

export const AdminDocumentsPage: React.FC = () => {
  const { documents, reviewDocument } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<ProviderDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const openCorrectionModal = (doc: ProviderDocument) => {
    setSelectedDoc(doc);
    setRejectionReason('');
    setIsModalOpen(true);
  };

  const handleConfirmCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc || !rejectionReason.trim()) return;

    reviewDocument(selectedDoc.id, 'CORRECTION_REQUIRED', rejectionReason.trim());
    setIsModalOpen(false);
  };

  const filteredDocs = documents.filter((d) => {
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-text">Fila de Validação e Auditoria Documental</h1>
          <p className="text-sm text-brand-muted">
            Conformidade obrigatória conforme Código de Trânsito Brasileiro e regulamentações metropolitanas (ARTESP/DTP).
          </p>
        </div>

        {/* Filter by status */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-muted" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-semibold rounded-xl border border-brand-border bg-white px-3 py-2 text-brand-text focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="UNDER_REVIEW">Em Análise</option>
            <option value="APPROVED">Aprovados</option>
            <option value="CORRECTION_REQUIRED">Correção Solicitada</option>
            <option value="REJECTED">Reprovados</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-muted">Prestador: {doc.providerName}</span>
                    <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      Tipo: {doc.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text mt-0.5">{doc.title}</h3>
                </div>
              </div>

              <div>
                {doc.status === 'APPROVED' && <Badge variant="approved">Aprovado</Badge>}
                {doc.status === 'UNDER_REVIEW' && <Badge variant="under_review">Em Análise</Badge>}
                {doc.status === 'CORRECTION_REQUIRED' && <Badge variant="warning">Correção Solicitada</Badge>}
                {doc.status === 'REJECTED' && <Badge variant="rejected">Reprovado</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-brand-bg p-3.5 rounded-2xl border border-brand-border">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Arquivo no S3/Storage:</span>
                <span className="font-mono text-brand-blue font-bold">{doc.fileName || 'Nenhum'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Data de Submissão:</span>
                <span className="text-slate-700">{doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString('pt-BR') : '-'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Validade Declarada:</span>
                <span className="text-slate-700">{doc.validUntil ? new Date(doc.validUntil).toLocaleDateString('pt-BR') : 'Sem data'}</span>
              </div>
            </div>

            {doc.rejectionReason && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Justificativa registrada para o motorista:</strong> "{doc.rejectionReason}"
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Auditoria registrada sob permissão de Administrador em conformidade com a LGPD.
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-rose-200 text-rose-700 hover:bg-rose-50"
                  onClick={() => openCorrectionModal(doc)}
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Solicitar Correção
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => reviewDocument(doc.id, 'APPROVED')}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Aprovar Documento
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal to specify correction reason */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solicitar Correção Documental ao Prestador"
        maxWidth="md"
      >
        <form onSubmit={handleConfirmCorrection} className="space-y-4">
          <p className="text-xs text-brand-muted">
            Descreva detalhadamente o que o motorista ou frotista precisa corrigir (ex: documento vencido, foto cortada, laudo incompleto).
          </p>

          <Input
            label="Motivo da Pendência / Orientação"
            placeholder="Ex: A apólice de seguro enviada venceu no mês passado. Favor enviar a renovação."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
          />

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive" size="sm">
              Confirmar Solicitação de Correção
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
