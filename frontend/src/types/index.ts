export type UserRole = 'visitor' | 'client' | 'provider' | 'admin';

export type ProviderApprovalStatus =
  | 'INCOMPLETE'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'CORRECTION_REQUIRED'
  | 'REJECTED'
  | 'SUSPENDED';

export type RequestStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'RECEIVING_PROPOSALS'
  | 'PROPOSAL_ACCEPTED'
  | 'CONTRACTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type ProposalStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'EXPIRED';

export type DocumentStatus =
  | 'NOT_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CORRECTION_REQUIRED';

export type BookingStatus =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export type TransportCategory =
  | 'eventual'
  | 'recorrente'
  | 'viagem'
  | 'corporativo'
  | 'escolar_autorizado';

export interface Waypoint {
  id: string;
  address: string;
  notes?: string;
  passengersCount?: number;
}

export interface TransportRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientType: 'PF' | 'PJ';
  title: string;
  category: TransportCategory;
  origin: string;
  destination: string;
  waypoints: Waypoint[];
  date: string;
  returnDate?: string;
  time: string;
  returnTime?: string;
  passengers: number;
  frequency: 'once' | 'daily' | 'weekly' | 'custom';
  frequencyDetails?: string;
  status: RequestStatus;
  estimatedBudgetMin?: number;
  estimatedBudgetMax?: number;
  additionalDetails?: string;
  createdAt: string;
  proposalsCount: number;
}

export interface Proposal {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerAvatar?: string;
  providerRating: number;
  providerTripsCount: number;
  vehicleId: string;
  vehicleModel: string;
  vehicleCapacity: number;
  price: number;
  conditions: string;
  notes?: string;
  status: ProposalStatus;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  providerId: string;
  model: string;
  year: number;
  plate: string; // Restrictly formatted (e.g. ABC-*D**)
  capacity: number;
  color: string;
  airConditioning: boolean;
  accessibilityAdapted: boolean;
  active: boolean;
  status: 'APPROVED' | 'UNDER_REVIEW' | 'PENDING_DOCS';
}

export interface ProviderDocument {
  id: string;
  providerId: string;
  providerName: string;
  vehicleId?: string;
  type: 'CNH_EAR' | 'CRLV' | 'ANTECEDENTES' | 'AUTORIZACAO_MUNICIPAL' | 'SEGURO_APP';
  title: string;
  description: string;
  status: DocumentStatus;
  fileUrl?: string;
  fileName?: string;
  submittedAt?: string;
  validUntil?: string;
  rejectionReason?: string;
}

export interface Booking {
  id: string;
  requestId: string;
  proposalId: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  vehicleModel: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  price: number;
  status: BookingStatus;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  clientType?: 'PF' | 'PJ';
  companyName?: string;
  cnpj?: string;
  providerStatus?: ProviderApprovalStatus;
  city: string;
}
