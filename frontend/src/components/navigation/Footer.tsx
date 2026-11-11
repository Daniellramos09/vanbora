import React from 'react';
import { Shield, MapPin, Lock } from 'lucide-react';
import { VanLogoIcon } from '../illustrations/VanLogoIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-20 pt-14 pb-10 text-brand-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-brand-border">
          {/* Column 1: Brand & Regional Scope */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-ink flex items-center justify-center text-white">
                <VanLogoIcon className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xl font-extrabold text-brand-ink">
                Van<span className="text-brand-blue">Bora</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-brand-muted">
              Marketplace simples de passeios e viagens em grupo por van. Conectamos famílias, amigos e passageiros direto a motoristas de confiança.
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
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Passeios e Excursões Familiares</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Chácaras e Sítios de Fim de Semana</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Traslados Aeroportos (GRU / CGH)</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Passeios Escolares e Aniversários</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Casamentos e Eventos de Amigos</li>
            </ul>
          </div>

          {/* Column 3: Segurança */}
          <div>
            <h4 className="text-xs font-extrabold text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-green" />
              <span>Cuidado e Confiança</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-brand-blue cursor-pointer transition-colors">CNH Categoria D com EAR Verificada</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Documentação do Veículo em Dia (CRLV)</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Veículo Revisado e Cinto em Todos os Bancos</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Certidão Negativa de Antecedentes</li>
              <li className="hover:text-brand-blue cursor-pointer transition-colors">Combinação Clara de Horário e Retorno</li>
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
            Plataforma de intermediação e conexão para viagens em van. Cada viagem é combinada e realizada por motoristas independentes e habilitados.
          </p>
        </div>
      </div>
    </footer>
  );
};
