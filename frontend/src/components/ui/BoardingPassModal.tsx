import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AuditStampIllustration } from '../illustrations/AuditStampIllustration';
import { useToast } from '../../context/ToastContext';
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Printer,
  FileCheck2,
  Phone,
} from 'lucide-react';

export interface BoardingPassData {
  id: string;
  requestId: string;
  clientName: string;
  providerName: string;
  vehicleModel: string;
  plate?: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  price: number;
  termsAcceptedDate?: string;
}

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BoardingPassData | null;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  if (!booking) return null;

  const pricePerPerson = Math.round(booking.price / Math.max(1, booking.passengers));
  const shareText = `🚐 *Comprovante VanBora - Viagem Confirmada*\n` +
    `Trajeto: ${booking.origin} ➔ ${booking.destination}\n` +
    `Data: ${new Date(booking.date).toLocaleDateString('pt-BR')} às ${booking.time}\n` +
    `Motorista: ${booking.providerName}\n` +
    `Veículo: ${booking.vehicleModel}\n` +
    `Passageiros: ${booking.passengers} pessoas (~R$ ${pricePerPerson}/pessoa)\n` +
    `Total: R$ ${booking.price.toLocaleString('pt-BR')}\n` +
    `Código da Reserva: #${booking.id}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success('Copiado para a área de transferência!', 'Texto formatado pronto para enviar no grupo do WhatsApp.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    toast.info('Preparando impressão', 'A janela do navegador para impressão do bilhete foi iniciada.');
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bilhete e Formalização de Viagem"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Printable Boarding Pass Card */}
        <div className="bg-[#FAF8F5] border-2 border-brand-border-strong rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-brand-border-strong">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Contrato & Bilhete Formalizado
                </span>
                <span className="text-xs font-mono font-bold text-brand-muted">
                  #{booking.id}
                </span>
              </div>
              <h3 className="text-lg font-black text-brand-text mt-1.5">
                {booking.origin.split('-')[0]} ➔ {booking.destination.split('-')[0]}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <AuditStampIllustration text="MOTORISTA VERIFICADO" className="w-20 h-20 opacity-90" />
            </div>
          </div>

          {/* Route timeline */}
          <div className="py-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-blue border-2 border-white shadow-sm" />
                <span className="w-0.5 h-8 bg-brand-border-strong border-dashed" />
                <span className="w-3.5 h-3.5 rounded-full bg-brand-yellow border-2 border-white shadow-sm" />
              </div>
              <div className="space-y-3 flex-1 -mt-0.5">
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Ponto de Embarque</p>
                  <p className="text-sm font-bold text-brand-ink">{booking.origin}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Destino Final</p>
                  <p className="text-sm font-bold text-brand-ink">{booking.destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y-2 border-dashed border-brand-border-strong text-xs">
            <div className="bg-white p-3 rounded-xl border border-brand-border">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Data da Viagem</p>
              <p className="font-extrabold text-brand-text flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                {new Date(booking.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-brand-border">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Horário de Saída</p>
              <p className="font-extrabold text-brand-text flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-brand-green" />
                {booking.time}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-brand-border">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Passageiros</p>
              <p className="font-extrabold text-brand-text flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-brand-yellow" />
                {booking.passengers} pessoas
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-brand-border">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Por Pessoa (aprox.)</p>
              <p className="font-extrabold text-brand-green mt-0.5">
                R$ {pricePerPerson}
              </p>
            </div>
          </div>

          {/* Driver & Van details */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-muted uppercase">Prestador Responsável</p>
              <p className="font-bold text-brand-text text-sm flex items-center gap-1.5">
                <span>{booking.providerName}</span>
              </p>
              <p className="text-xs text-brand-muted">
                {booking.vehicleModel} {booking.plate ? `· Placa: ${booking.plate}` : ''}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[10px] font-bold text-brand-muted uppercase">Valor Total Acordado</p>
              <p className="text-2xl font-black text-brand-blue-dark">
                R$ {booking.price.toLocaleString('pt-BR')}
              </p>
              <p className="text-[10px] text-emerald-700 font-bold flex items-center sm:justify-end gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sem surpresas no embarque
              </p>
            </div>
          </div>
        </div>

        {/* Contract clause highlights */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs space-y-2 text-slate-700">
          <p className="font-bold text-blue-900 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-blue-700" />
            Termos de Formalização do Transporte Privado
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
            <li>O contratante declara estar ciente do itinerário, horários e pontos combinados diretamente.</li>
            <li>O prestador responsável é autônomo verificado, com documentação habilitada (CNH com EAR e veículo em dia).</li>
            <li>Cancelamentos com antecedência superior a 48h garantem estorno integral de qualquer taxa ou sinal acordado.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-brand-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
          >
            Imprimir / Salvar PDF
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyShare}
              icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              {copied ? 'Copiado para o WhatsApp!' : 'Copiar para o Grupo'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
              className="flex-1 sm:flex-initial"
            >
              Concluir
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
