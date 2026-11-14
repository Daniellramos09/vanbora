import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface VanPhoto {
  url: string;
  caption: string;
}

interface VanGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  vanModel: string;
  photos: VanPhoto[];
}

export const VanGalleryModal: React.FC<VanGalleryModalProps> = ({
  isOpen,
  onClose,
  driverName,
  vanModel,
  photos,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Fotos da Van — ${vanModel}`}>
      <div className="space-y-4 text-xs text-brand-ink">
        {/* Carrossel Principal */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-900 rounded-3xl overflow-hidden shadow-towel flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Gradiente e Legenda */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
            <p className="font-extrabold text-sm">{currentPhoto.caption}</p>
            <p className="text-[11px] text-white/80">
              Veículo vistoriado e higienizado de {driverName}
            </p>
          </div>

          {/* Botões de Navegação */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                title="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                title="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Indicador de Quantidade */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold font-mono">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Miniaturas */}
        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Selo de Garantia do Veículo */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-[11px] leading-relaxed">
            <strong>Garantia VanBora:</strong> A van que buscar o seu grupo no dia do passeio deve corresponder ao modelo e padrão de fotos apresentados aqui.
          </span>
        </div>
      </div>
    </Modal>
  );
};
