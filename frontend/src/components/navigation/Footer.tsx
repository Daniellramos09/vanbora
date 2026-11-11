import React from 'react';
import { Shield, MapPin, Truck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-20 pt-14 pb-10 text-brand-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-brand-border">
          {/* Column 1: Brand & Regional Scope */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-ink flex items-center justify-center text-white">
                <Truck className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xl font-extrabold text-brand-ink">
                Van<span className="text-brand-blue">Bora</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-brand-muted">
              Marketplace de fretamento e transporte coletivo por vans. Conectamos demanda qualificada a motoristas devidamente habilitados.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink pt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" />
              <span>Operação Inicial: Grande São Paulo — SP</span>
            </div>
          </div>

          {/* Column 2: Categorias */}
          <div>
            <h4 className="text-xs font-extrabold text-brand-ink uppercase tracking-wider mb-3">
              Modalidades
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Transporte de Colaboradores (Empresas)</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Passeios e Excursões Familiares</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Traslados Aeroportos (GRU / CGH)</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Eventos Corporativos e Congressos</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Transporte Escolar Autorizado (DTP)</li>
            </ul>
          </div>

          {/* Column 3: Segurança */}
          <div>
            <h4 className="text-xs font-extrabold text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-green" />
              <span>Auditoria e Regras</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-brand-blue cursor-pointer transition-colors">CNH Categoria D com EAR Obrigatório</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Vistoria e CRLV Aluguel Semestral</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Seguro Obrigatório de Passageiros (APP)</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Certidão Negativa de Antecedentes</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Termos de Adesão e Responsabilidade</li>
            </ul>
          </div>

          {/* Column 4: LGPD */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-blue" />
              <span>Privacidade & LGPD</span>
            </h4>
            <p className="text-xs leading-relaxed text-brand-muted">
              Placas mascaradas publicamente e documentos pessoais mantidos em ambiente protegido. Não expomos rotinas nem dados de passageiros.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-green-soft text-brand-green text-[11px] font-extrabold border border-emerald-200">
                100% em Conformidade LGPD
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Regulatory Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© 2026 VanBora Tecnologia de Mobilidade. Todos os direitos reservados.</p>
          <p className="text-center sm:text-right text-[11px]">
            Intermediação de transporte coletivo sob demanda. Serviços executados por transportadores habilitados conforme CTB, ARTESP e DTP.
          </p>
        </div>
      </div>
    </footer>
  );
};
