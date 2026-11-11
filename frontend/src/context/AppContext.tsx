import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  TransportRequest,
  Proposal,
  Vehicle,
  ProviderDocument,
  Booking,
  ProviderApprovalStatus,
  DocumentStatus,
} from '../types';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  requests: TransportRequest[];
  proposals: Proposal[];
  vehicles: Vehicle[];
  documents: ProviderDocument[];
  bookings: Booking[];
  addRequest: (request: Omit<TransportRequest, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => TransportRequest;
  addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => void;
  acceptProposal: (proposalId: string, requestId: string) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'status'>) => void;
  submitDocument: (docId: string, fileName: string) => void;
  reviewDocument: (docId: string, status: DocumentStatus, reason?: string) => void;
  updateProviderStatus: (status: ProviderApprovalStatus) => void;
  calculateEstimate: (params: { distanceKm: number; hours: number; passengers: number; waypointsCount: number }) => { min: number; max: number };
}

// Initial Mock Seed Data reflecting real everyday trips & independent drivers
const initialUser: UserProfile = {
  id: 'usr-1',
  name: 'Família Silveira & Amigos',
  email: 'marcia.silveira@gmail.com',
  phone: '(11) 98765-4321',
  role: 'client',
  clientType: 'PF',
  city: 'São Paulo - SP',
};

const initialRequests: TransportRequest[] = [
  {
    id: 'req-101',
    clientId: 'usr-1',
    clientName: 'Márcia Silveira (Passeio em Família)',
    clientType: 'PF',
    title: 'Passeio em Família no Sábado para Sítio em Mairiporã',
    category: 'viagem',
    origin: 'Praça 8 de Setembro - Penha, São Paulo',
    destination: 'Chácara das Flores - Estrada da Roseira, Mairiporã - SP',
    waypoints: [
      { id: 'w1', address: 'Metrô Penha - Saída Radial', notes: 'Pegar tios e primos (4 pessoas)', passengersCount: 4 },
      { id: 'w2', address: 'Av. Guapira, 1200 - Tucuruvi', notes: 'Pegar vovó e sobrinhos (4 pessoas)', passengersCount: 4 },
    ],
    date: '2026-11-21',
    time: '08:00',
    returnDate: '2026-11-21',
    returnTime: '18:30',
    passengers: 15,
    frequency: 'once',
    status: 'RECEIVING_PROPOSALS',
    estimatedBudgetMin: 600,
    estimatedBudgetMax: 780,
    additionalDetails: 'Dia de churrasco da família. Queremos uma van limpinha e motorista pontual.',
    createdAt: '2026-11-10T09:00:00Z',
    proposalsCount: 2,
  },
  {
    id: 'req-102',
    clientId: 'usr-2',
    clientName: 'Carla Mendes (Aniversário da Manu)',
    clientType: 'PF',
    title: 'Levar as Crianças para Aniversário / Buffet Infantil',
    category: 'escolar_autorizado',
    origin: 'Rua Voluntários da Pátria, 1500 - Santana, São Paulo',
    destination: 'Buffet Infantil Planeta da Alegria - Tatuapé, São Paulo',
    waypoints: [
      { id: 'w3', address: 'Condomínio das Palmeiras - Santana', notes: '8 amiguinhos do prédio', passengersCount: 8 },
    ],
    date: '2026-11-22',
    time: '13:00',
    returnDate: '2026-11-22',
    returnTime: '18:00',
    passengers: 12,
    frequency: 'once',
    status: 'RECEIVING_PROPOSALS',
    estimatedBudgetMin: 380,
    estimatedBudgetMax: 460,
    additionalDetails: 'Obrigatório van escolar com cinto em todos os assentos e monitora para acompanhar.',
    createdAt: '2026-11-10T14:30:00Z',
    proposalsCount: 1,
  },
  {
    id: 'req-103',
    clientId: 'usr-3',
    clientName: 'Rodrigo e Amigos',
    clientType: 'PF',
    title: 'Amigos para Casamento em São Roque (Ida e Volta)',
    category: 'viagem',
    origin: 'Metrô Barra Funda - Terminal Turístico',
    destination: 'Espaço dos Vinhedos - Estrada do Vinho, São Roque - SP',
    waypoints: [
      { id: 'w4', address: 'Av. Francisco Matarazzo - Barra Funda', notes: 'Ponto de encontro dos amigos', passengersCount: 14 },
    ],
    date: '2026-12-05',
    time: '14:30',
    returnDate: '2026-12-05',
    returnTime: '23:30',
    passengers: 14,
    frequency: 'once',
    status: 'CONTRACTED',
    estimatedBudgetMin: 750,
    estimatedBudgetMax: 950,
    additionalDetails: 'Casamento à tarde. Todo mundo vai junto para não ter perigo de beber e dirigir.',
    createdAt: '2026-11-08T11:00:00Z',
    proposalsCount: 3,
  },
];

const initialProposals: Proposal[] = [
  {
    id: 'prop-1',
    requestId: 'req-101',
    providerId: 'prov-1',
    providerName: 'Carlos Eduardo Ramos (Seu Carlos da Van)',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    providerRating: 4.9,
    providerTripsCount: 142,
    vehicleId: 'veh-1',
    vehicleModel: 'Mercedes-Benz Sprinter (19 Lugares)',
    vehicleCapacity: 19,
    price: 680,
    conditions: 'Inclui ida, volta e espera durante o churrasco no sítio. Ar-condicionado e van revisada.',
    notes: 'Faço transporte escolar na Penha de segunda a sexta, e aos sábados atendo famílias para passeios tranquilos.',
    status: 'PENDING',
    createdAt: '2026-11-10T10:15:00Z',
  },
  {
    id: 'prop-2',
    requestId: 'req-101',
    providerId: 'prov-2',
    providerName: 'Tia Valquíria & Equipe',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    providerRating: 5.0,
    providerTripsCount: 98,
    vehicleId: 'veh-2',
    vehicleModel: 'Renault Master Minibus (16 Lugares)',
    vehicleCapacity: 16,
    price: 650,
    conditions: 'Ida e volta garantidas, pontualidade britânica e van higienizada.',
    notes: 'Adoramos passeios com famílias e crianças. Tenho assento de elevação se precisarem!',
    status: 'PENDING',
    createdAt: '2026-11-10T12:00:00Z',
  },
  {
    id: 'prop-3',
    requestId: 'req-102',
    providerId: 'prov-2',
    providerName: 'Tia Valquíria & Monitora',
    providerRating: 5.0,
    providerTripsCount: 98,
    vehicleId: 'veh-3',
    vehicleModel: 'Ford Transit Escolar com Cintos Individuais',
    vehicleCapacity: 18,
    price: 420,
    conditions: 'Monitora inclusa para auxiliar no embarque e desembarque tranquilo no buffet infantil.',
    notes: 'Van bem cuidada e experiência de mais de 10 anos cuidando dos pequenos.',
    status: 'PENDING',
    createdAt: '2026-11-10T15:20:00Z',
  },
];

const initialVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    providerId: 'prov-1',
    model: 'Mercedes-Benz Sprinter 516 Executiva',
    year: 2023,
    plate: 'SP · BRA-4*89',
    capacity: 19,
    color: 'Prata Metálico',
    airConditioning: true,
    accessibilityAdapted: true,
    active: true,
    status: 'APPROVED',
  },
  {
    id: 'veh-3',
    providerId: 'prov-1',
    model: 'Ford Transit Escolar Especial',
    year: 2022,
    plate: 'SP · FXG-9*12',
    capacity: 21,
    color: 'Amarelo Escolar com Faixa',
    airConditioning: true,
    accessibilityAdapted: false,
    active: true,
    status: 'APPROVED',
  },
  {
    id: 'veh-2',
    providerId: 'prov-2',
    model: 'Renault Master Minibus Executive',
    year: 2022,
    plate: 'SP · RKM-1*34',
    capacity: 16,
    color: 'Branco Polar',
    airConditioning: true,
    accessibilityAdapted: false,
    active: true,
    status: 'APPROVED',
  },
];

const initialDocuments: ProviderDocument[] = [
  {
    id: 'doc-1',
    providerId: 'prov-1',
    providerName: 'Carlos Eduardo Ramos',
    type: 'CNH_EAR',
    title: 'CNH Categoria D com EAR (Exerce Atividade Remunerada)',
    description: 'Documento nacional de habilitação válido para condução profissional de transporte coletivo.',
    status: 'APPROVED',
    fileName: 'cnh_carlos_ramos_ear.pdf',
    submittedAt: '2026-10-01',
    validUntil: '2028-09-15',
  },
  {
    id: 'doc-2',
    providerId: 'prov-1',
    providerName: 'Carlos Eduardo Ramos',
    vehicleId: 'veh-1',
    type: 'CRLV',
    title: 'CRLV Veicular - Mercedes Sprinter 516',
    description: 'Certificado de Registro e Licenciamento do Veículo 2026 quitado na categoria aluguel/passageiro.',
    status: 'APPROVED',
    fileName: 'crlv_sprinter_2026.pdf',
    submittedAt: '2026-10-01',
    validUntil: '2027-10-31',
  },
  {
    id: 'doc-3',
    providerId: 'prov-1',
    providerName: 'Carlos Eduardo Ramos',
    type: 'ANTECEDENTES',
    title: 'Certidão Negativa de Antecedentes Criminais',
    description: 'Certidão emitida pela Polícia Federal e Justiça Estadual.',
    status: 'APPROVED',
    fileName: 'antecedentes_carlos_pf_sp.pdf',
    submittedAt: '2026-10-01',
    validUntil: '2027-04-01',
  },
  {
    id: 'doc-4',
    providerId: 'prov-3',
    providerName: 'Marcos Vinícius Silva (Van Express ABC)',
    type: 'AUTORIZACAO_MUNICIPAL',
    title: 'Alvará Municipal de Transporte Escolar / Fretamento',
    description: 'Autorização municipal emitida pela Prefeitura de Santo André / SPTrans.',
    status: 'UNDER_REVIEW',
    fileName: 'alvara_santo_andre_2026.pdf',
    submittedAt: '2026-11-09',
    validUntil: '2027-06-30',
  },
  {
    id: 'doc-5',
    providerId: 'prov-3',
    providerName: 'Marcos Vinícius Silva (Van Express ABC)',
    type: 'SEGURO_APP',
    title: 'Comprovante de Vistoria e Revisão do Veículo',
    description: 'Revisão periódica de freios, pneus e cintos de segurança.',
    status: 'CORRECTION_REQUIRED',
    fileName: 'vistoria_preventiva_antiga.pdf',
    submittedAt: '2026-11-08',
    validUntil: '2026-10-15',
    rejectionReason: 'O comprovante enviado está com data anterior a 6 meses. Por favor, envie o comprovante da última revisão.',
  },
];

const initialBookings: Booking[] = [
  {
    id: 'book-501',
    requestId: 'req-103',
    proposalId: 'prop-99',
    clientId: 'usr-3',
    clientName: 'Rodrigo e Amigos',
    providerId: 'prov-1',
    providerName: 'Carlos Eduardo Ramos (Seu Carlos)',
    vehicleModel: 'Mercedes-Benz Sprinter (19 Lugares)',
    origin: 'Metrô Barra Funda - Terminal Turístico',
    destination: 'Espaço dos Vinhedos - Estrada do Vinho, São Roque - SP',
    date: '2026-12-05',
    time: '14:30',
    passengers: 14,
    price: 850,
    status: 'CONFIRMED',
    createdAt: '2026-11-09T16:00:00Z',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setRole] = useState<UserRole>('visitor');
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUser);
  const [requests, setRequests] = useState<TransportRequest[]>(initialRequests);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [documents, setDocuments] = useState<ProviderDocument[]>(initialDocuments);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  // Sync currentUser attributes when switching role for demo purposes
  useEffect(() => {
    if (currentRole === 'client') {
      setCurrentUser({
        id: 'usr-1',
        name: 'Empresa Alpha Logística',
        email: 'operacoes@alphalog.com.br',
        phone: '(11) 98765-4321',
        role: 'client',
        clientType: 'PJ',
        companyName: 'Alpha Serviços Corporativos Ltda',
        cnpj: '12.345.678/0001-90',
        city: 'São Paulo - SP',
      });
    } else if (currentRole === 'provider') {
      setCurrentUser({
        id: 'prov-1',
        name: 'Carlos Eduardo Ramos',
        email: 'carlos.ramos@transporteramos.com.br',
        phone: '(11) 99123-8877',
        role: 'provider',
        providerStatus: 'APPROVED',
        city: 'São Paulo (Zona Leste / Centro) - SP',
      });
    } else if (currentRole === 'admin') {
      setCurrentUser({
        id: 'adm-1',
        name: 'Daniel Ramos (Auditoria & Operações)',
        email: 'compliance@vanbora.com.br',
        phone: '(11) 3100-5000',
        role: 'admin',
        city: 'São Paulo - SP',
      });
    }
  }, [currentRole]);

  const addRequest = (data: Omit<TransportRequest, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => {
    const newReq: TransportRequest = {
      ...data,
      id: `req-${Date.now().toString().slice(-4)}`,
      status: 'RECEIVING_PROPOSALS',
      proposalsCount: 0,
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const addProposal = (propData: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    const newProp: Proposal = {
      ...propData,
      id: `prop-${Date.now().toString().slice(-4)}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setProposals((prev) => [newProp, ...prev]);
    setRequests((prev) =>
      prev.map((r) => (r.id === propData.requestId ? { ...r, proposalsCount: r.proposalsCount + 1 } : r))
    );
  };

  const acceptProposal = (proposalId: string, requestId: string) => {
    const prop = proposals.find((p) => p.id === proposalId);
    const req = requests.find((r) => r.id === requestId);
    if (!prop || !req) return;

    // Update proposal status
    setProposals((prev) =>
      prev.map((p) => {
        if (p.requestId === requestId) {
          return p.id === proposalId ? { ...p, status: 'ACCEPTED' } : { ...p, status: 'REJECTED' };
        }
        return p;
      })
    );

    // Update request status
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'CONTRACTED' } : r))
    );

    // Create a new Booking
    const newBooking: Booking = {
      id: `book-${Date.now().toString().slice(-4)}`,
      requestId: req.id,
      proposalId: prop.id,
      clientId: req.clientId,
      clientName: req.clientName,
      providerId: prop.providerId,
      providerName: prop.providerName,
      vehicleModel: prop.vehicleModel,
      origin: req.origin,
      destination: req.destination,
      date: req.date,
      time: req.time,
      passengers: req.passengers,
      price: prop.price,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const addVehicle = (vehData: Omit<Vehicle, 'id' | 'status'>) => {
    const newVeh: Vehicle = {
      ...vehData,
      id: `veh-${Date.now().toString().slice(-4)}`,
      status: 'UNDER_REVIEW',
    };
    setVehicles((prev) => [newVeh, ...prev]);
  };

  const submitDocument = (docId: string, fileName: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: 'UNDER_REVIEW',
              fileName,
              submittedAt: new Date().toISOString().split('T')[0],
              rejectionReason: undefined,
            }
          : d
      )
    );
  };

  const reviewDocument = (docId: string, status: DocumentStatus, reason?: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status, rejectionReason: reason } : d
      )
    );
  };

  const updateProviderStatus = (status: ProviderApprovalStatus) => {
    setCurrentUser((prev) => ({ ...prev, providerStatus: status }));
  };

  // Operational pricing formula as formulated in Section 10 of README 01:
  // Base cost = (km * kmRate) + (hours * hourRate) + (waypoints * stopRate) + passengers allowance
  const calculateEstimate = ({
    distanceKm,
    hours,
    passengers,
    waypointsCount,
  }: {
    distanceKm: number;
    hours: number;
    passengers: number;
    waypointsCount: number;
  }) => {
    const kmRate = 6.5; // Average fuel, tire, depreciation per km in SP metropolitan area
    const hourRate = 45.0; // Driver time & availability
    const waypointRate = 35.0; // Extra boarding point logistics
    const passengerFactor = passengers > 15 ? 1.2 : 1.0;

    const baseCost =
      (distanceKm * kmRate + hours * hourRate + waypointsCount * waypointRate) * passengerFactor;
    
    // Minimum fair pricing floor for chartered van dispatch in SP
    const floor = Math.max(350, baseCost);

    return {
      min: Math.round((floor * 0.9) / 10) * 10,
      max: Math.round((floor * 1.2) / 10) * 10,
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        currentUser,
        setCurrentUser,
        requests,
        proposals,
        vehicles,
        documents,
        bookings,
        addRequest,
        addProposal,
        acceptProposal,
        addVehicle,
        submitDocument,
        reviewDocument,
        updateProviderStatus,
        calculateEstimate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
