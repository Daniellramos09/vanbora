import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  FileCheck,
} from 'lucide-react';
import { ProviderDocument } from '../../types';

export const ProviderDocumentsPage: React.FC = () => {
  const { documents, submitDocument } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<ProviderDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fakeFile, setFakeFile] = useState<File | null>(null);
  const [fakeFileName, setFakeFileName] = useState('');

  const openUploadModal = (doc: ProviderDocument) => {
    setSelectedDoc(doc);
    setFakeFileName(`novo_${doc.type.toLowerCase()}_2026.pdf`);
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;
    submitDocument(selectedDoc.id, fakeFileName || 'documento_renovado.pdf');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-brand-text">Gestão de Documentação Obrigatória</h1>
        <p className="text-sm text-brand-muted">
          A VanBora confere a documentação do motorista (CNH EAR) e do veículo (CRLV em dia) para garantir tranquilidade aos passageiros.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-text">{doc.title}</h3>
                  <p className="text-xs text-brand-muted">{doc.description}</p>
                </div>
              </div>

              <div>
                {doc.status === 'APPROVED' && <Badge variant="approved">Aprovado e Válido</Badge>}
                {doc.status === 'UNDER_REVIEW' && <Badge variant="under_review">Em Análise Técnica</Badge>}
                {doc.status === 'CORRECTION_REQUIRED' && <Badge variant="warning">Correção Necessária</Badge>}
                {doc.status === 'REJECTED' && <Badge variant="rejected">Reprovado</Badge>}
                {doc.status === 'EXPIRED' && <Badge variant="warning">Vencido</Badge>}
              </div>
            </div>

            {/* Document metadata & dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-brand-bg p-3.5 rounded-2xl border border-brand-border">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Arquivo Anexado:</span>
                <span className="font-mono text-brand-text text-[11px] font-semibold">{doc.fileName || 'Nenhum arquivo enviado'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Data de Envio:</span>
                <span className="text-slate-700">{doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString('pt-BR') : '-'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block">Validade Registrada:</span>
                <span className="text-slate-700">{doc.validUntil ? new Date(doc.validUntil).toLocaleDateString('pt-BR') : '-'}</span>
              </div>
            </div>

            {/* Rejection / Correction guidance required by README 03 Section 4.3 */}
            {doc.rejectionReason && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Motivo da pendência apontado pela auditoria:</span>
                </div>
                <p className="text-amber-800 leading-relaxed pl-5">
                  "{doc.rejectionReason}"
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-brand-muted">
                Documentos mantidos em armazenamento criptografado e não expostos ao público (LGPD).
              </span>

              <Button
                size="sm"
                variant={doc.status === 'CORRECTION_REQUIRED' ? 'primary' : 'outline'}
                onClick={() => openUploadModal(doc)}
                icon={<Upload className="w-3.5 h-3.5" />}
              >
                {doc.status === 'CORRECTION_REQUIRED' ? 'Enviar Novo Documento Corrigido' : 'Atualizar Arquivo'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title={selectedDoc ? `Enviar: ${selectedDoc.title}` : 'Enviar Documento'}
        maxWidth="md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <p className="text-xs text-brand-muted">
            Formatos aceitos: PDF, JPG ou PNG de até 10MB. As informações devem estar nítidas para auditoria da equipe da VanBora.
          </p>

          <div className="p-6 border-2 border-dashed border-brand-border rounded-2xl bg-brand-bg text-center space-y-2">
            <Upload className="w-8 h-8 text-brand-blue mx-auto" />
            <p className="text-xs font-semibold text-brand-text">
              Arraste seu arquivo aqui ou digite o nome do comprovante
            </p>
            <input
              type="text"
              value={fakeFileName}
              onChange={(e) => setFakeFileName(e.target.value)}
              className="text-xs w-full max-w-xs mx-auto border rounded-lg px-2 py-1.5 text-center bg-white"
              placeholder="nome_do_arquivo.pdf"
              required
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={<FileCheck className="w-4 h-4" />}>
              Confirmar Envio para Auditoria
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
