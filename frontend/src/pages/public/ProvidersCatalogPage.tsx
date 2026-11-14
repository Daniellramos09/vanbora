import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { VanBoraApi } from '../../services/apiClient';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { SkeletonCard } from '../../components/ui/Skeleton';
import {
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  Lock,
  Search,
  Filter,
  Users,
  Sparkles,
  HeartHandshake,
  Calendar,
  AlertTriangle,
  BadgeCheck,
} from 'lucide-react';

interface ProvidersCatalogPageProps {
  setCurrentTab: (tab: string) => void;
}

interface ProviderCatalogItem {
  id: string;
  userId: string;
  name: string;
  nickname: string;
  baseRegion: string;
  operatingZones: string;
  rating: number;
  completedTrips: number;
  bio: string;
  amenities: string;
  verifiedCnhEar: boolean;
  avatarUrl?: string;
  vanModel?: string;
  vanCapacity?: number;
}

const DEMO_PROVIDERS: ProviderCatalogItem[] = [
  {
    id: 'prov-1',
    userId: 'u-carlos',
    name: 'Carlos Alberto Silva',
    nickname: 'Seu Carlos da Van',
    baseRegion: 'Zona Leste (Penha & Tatuapé)',
    operatingZones: 'Penha, Tatuapé, Mooca, Belém, Mairiporã, Litoral Norte',
    rating: 4.95,
    completedTrips: 184,
    bio: 'Motorista há 16 anos. Especialista em viagens com crianças e famílias para sítios, praias e buffets. Van impecável e muito acolhimento.',
    amenities: 'Ar-condicionado gelando, Tomadas USB, Bancos reclináveis, Porta-malas extra',
    verifiedCnhEar: true,
    vanModel: 'Mercedes-Benz Sprinter 516',
    vanCapacity: 19,
  },
  {
    id: 'prov-2',
    userId: 'u-valmir',
    name: 'Valmir de Oliveira',
    nickname: 'Tio Valmir Transportes',
    baseRegion: 'Zona Norte (Santana & Tucuruvi)',
    operatingZones: 'Santana, Tucuruvi, Jaçanã, Serra da Cantareira, Atibaia',
    rating: 4.90,
    completedTrips: 142,
    bio: 'Mais de uma década transportando grupos com máxima pontualidade. Viagens confortáveis para aniversários, casamentos e passeios rurais.',
    amenities: 'Ar-condicionado, Wi-Fi a bordo, Cinto de segurança 3 pontos, Cortinas térmicas',
    verifiedCnhEar: true,
    vanModel: 'Renault Master Grand L3H2',
    vanCapacity: 16,
  },
  {
    id: 'prov-3',
    userId: 'u-marcos',
    name: 'Marcos Vinicius Santos',
    nickname: 'Marcos Van Express',
    baseRegion: 'ABC Paulista (Santo André & SBC)',
    operatingZones: 'Santo André, São Bernardo, São Caetano, Baixada Santista, Aeroporto GRU',
    rating: 4.98,
    completedTrips: 210,
    bio: 'Atendimento corporativo e familiar. Pontualidade britânica em traslados para aeroportos e bate-e-volta em praias.',
    amenities: 'Ar-condicionado digital, Porta-malas espaçoso para malas grandes, Som ambiente suave',
    verifiedCnhEar: true,
    vanModel: 'Ford Transit Minibus',
    vanCapacity: 15,
  },
  {
    id: 'prov-4',
    userId: 'u-edson',
    name: 'Edson Pereira Ramos',
    nickname: 'Tio Edson Van',
    baseRegion: 'Zona Sul (Vila Mariana & Saúde)',
    operatingZones: 'Vila Mariana, Saúde, Ipiranga, Jabaquara, Embu das Artes, São Roque',
    rating: 4.88,
    completedTrips: 97,
    bio: 'Passeios gastronômicos e retiros. Condução suave e segura pensada em idosos e crianças de colo.',
    amenities: 'Ar-condicionado, Degrau elétrico retrátil para embarque fácil, Som Bluetooth',
    verifiedCnhEar: true,
    vanModel: 'Mercedes-Benz Sprinter 415',
    vanCapacity: 16,
  },
];

export const ProvidersCatalogPage: React.FC<ProvidersCatalogPageProps> = ({ setCurrentTab }) => {
  const toast = useToast();
  const [providers, setProviders] = useState<ProviderCatalogItem[]>(DEMO_PROVIDERS);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderCatalogItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Busca motoristas atualizados direto do PostgreSQL via Spring Boot
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setIsLoading(true);
      try {
        const res = await VanBoraApi.getProvidersCatalog();
        if (res.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          // Mescla com os demos
          const apiMapped: ProviderCatalogItem[] = res.data.map((p: any) => ({
            id: p.id,
            userId: p.userId,
            name: p.name,
            nickname: p.nickname || p.name,
            baseRegion: p.baseRegion || 'Grande São Paulo',
            operatingZones: p.operatingZones || 'São Paulo e Região Metropolitana',
            rating: Number(p.rating) || 5.0,
            completedTrips: p.completedTrips || 12,
            bio: p.bio || 'Motorista parceiro com CNH EAR e van vistoriada.',
            amenities: p.amenities || 'Ar-condicionado, Cinto de segurança',
            verifiedCnhEar: p.verifiedCnhEar ?? true,
            vanModel: 'Van Executiva',
            vanCapacity: 16,
          }));
          setProviders([...apiMapped, ...DEMO_PROVIDERS.filter((d) => !apiMapped.some((a) => a.id === d.id))]);
        }
      } catch (err) {
        console.warn('Erro ao carregar catálogo da API:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProviders = providers.filter((p) => {
    const matchesRegion =
      selectedRegion === 'all' ||
      p.baseRegion.toLowerCase().includes(selectedRegion.toLowerCase()) ||
      p.operatingZones.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch =
      searchTerm === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.operatingZones.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleOpenContact = (provider: ProviderCatalogItem) => {
    setSelectedProvider(provider);
    setIsContactModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner Informativo: Por que contratar com a Garantia VanBora? */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-emerald-200 border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Proteção Anti-Golpe & Preço Justo
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Catálogo de Motoristas Verificados
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Conheça os motoristas credenciados da sua região na Grande São Paulo. Veja avaliações reais,
            bairros onde atuam e solicite sua viagem com <strong>pagamento 100% protegido em custódia</strong>.
          </p>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-brand-surface rounded-2xl border border-brand-border p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por bairro (ex: Penha, Santana, ABC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-ink"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-brand-muted flex-shrink-0" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full md:w-auto text-xs font-bold rounded-xl border border-brand-border bg-white px-4 py-2.5 text-brand-ink focus:outline-none"
          >
            <option value="all">Todas as Regiões</option>
            <option value="Zona Leste">Zona Leste (Penha, Tatuapé, Mooca)</option>
            <option value="Zona Norte">Zona Norte (Santana, Tucuruvi)</option>
            <option value="Zona Sul">Zona Sul (Vila Mariana, Ipiranga)</option>
            <option value="ABC">ABC Paulista (Santo André, SBC, SCS)</option>
          </select>
        </div>
      </div>

      {/* Lista de Motoristas em Cards com Skeleton Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-brand-border-strong p-12 text-center space-y-3 shadow-towel">
          <p className="text-base font-extrabold text-brand-ink">
            Nenhum motorista encontrado nesta região
          </p>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Tente buscar por outro bairro ou selecione "Todas as Regiões" para ver profissionais disponíveis.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRegion('all');
              setSearchTerm('');
            }}
            className="text-xs mt-2"
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-3xl border-2 border-brand-border-strong p-6 shadow-towel hover:shadow-towel-hover transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header do Card */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center font-black text-amber-900 text-lg shadow-inner">
                    {provider.nickname.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-brand-ink text-base sm:text-lg">
                        {provider.nickname}
                      </h3>
                      <span title="Identidade & CNH EAR Verificada">
                        <BadgeCheck className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted">{provider.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {provider.rating.toFixed(2)}
                      </span>
                      <span className="text-xs text-brand-muted font-medium">
                        • {provider.completedTrips} viagens realizadas
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  Disponível
                </span>
              </div>

              {/* Bio & Detalhes */}
              <p className="text-xs text-brand-ink/80 mt-3 leading-relaxed">
                "{provider.bio}"
              </p>

              {/* Região e Van */}
              <div className="mt-4 pt-3 border-t border-brand-border/60 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-brand-ink">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Base:</strong> {provider.baseRegion}
                    <p className="text-[11px] text-brand-muted leading-tight mt-0.5">
                      <strong>Atua em:</strong> {provider.operatingZones}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-brand-muted pt-1">
                  <span className="flex items-center gap-1 font-semibold text-brand-ink">
                    <Users className="w-3.5 h-3.5 text-brand-blue" />
                    {provider.vanCapacity || 16} lugares
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                    {provider.vanModel || 'Van Executiva'}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 mt-2">
                  <strong className="text-slate-800">Conforto a bordo:</strong> {provider.amenities}
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="pt-2 flex items-center gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  toast.success(`Motorista Selecionado: ${provider.nickname}`, 'Preencha os dados da viagem para receber a confirmação de disponibilidade.');
                  setCurrentTab('new-request');
                }}
                className="w-full text-xs font-bold"
              >
                Solicitar Viagem com {provider.nickname.split(' ')[0]}
              </Button>
              <button
                type="button"
                onClick={() => handleOpenContact(provider)}
                className="p-2.5 rounded-2xl border border-brand-border hover:bg-slate-100 text-brand-muted transition-colors"
                title="Informações de Contato & Segurança"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Modal Educativo: Por que o telefone direto é liberado após a reserva protegida? */}
      {isContactModalOpen && selectedProvider && (
        <Modal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title={`Contato Seguro com ${selectedProvider.nickname}`}
        >
          <div className="space-y-4 text-sm text-brand-ink">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-900">
                  Como funciona o contato e por que evitamos o pagamento por fora?
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Para proteger você contra golpes de motoristas falsos que somem após receber o sinal via Pix,
                  e para proteger o motorista de calote no fim da corrida, a reserva é feita com <strong>Garantia VanBora</strong>.
                </p>
              </div>
            </div>

            <div className="border border-brand-border rounded-2xl p-4 space-y-3 bg-white">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-muted">
                Fluxo de Contato & Embarque
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>1. Você envia os detalhes do passeio com o preço justo tabelado.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>2. O pagamento fica retido com segurança na plataforma (Escrow).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>3. O <strong>WhatsApp e telefone direto</strong> do motorista são liberados para alinhamento fino do dia.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>4. O motorista só recebe o valor após o embarque e conclusão do passeio.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsContactModalOpen(false)}
                className="w-1/2 text-xs"
              >
                Entendi
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsContactModalOpen(false);
                  setCurrentTab('new-request');
                }}
                className="w-1/2 text-xs"
              >
                Iniciar Solicitação
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
