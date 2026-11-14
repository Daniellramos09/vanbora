/**
 * Centralized API Client for VanBora
 * Integrates with Java 21 Spring Boot Backend (/api/v1/...) with graceful demo fallback.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isFallback?: boolean;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      credentials: 'include', // sends and receives HttpOnly cookies
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || errorData?.message || `Erro ${response.status}: ${response.statusText}`;
      return { data: null, error: errorMessage };
    }

    const data = await response.json();
    return { data, error: null, isFallback: false };
  } catch (err: any) {
    // Network error or backend offline: return fallback flag
    return {
      data: null,
      error: err?.name === 'AbortError' ? 'Tempo de resposta excedido' : 'Backend indisponível (usando dados locais)',
      isFallback: true,
    };
  }
}

export const VanBoraApi = {
  // Autenticação
  login: (credentials: { email: string; password: string }) =>
    request<{ token: string; email: string; name: string; role: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (payload: any) =>
    request<{ token: string; email: string; name: string; role: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Estimativa de Preço Justo
  getEstimate: (params: { distanceKm: number; hours: number; passengers: number; waypointsCount: number }) =>
    request<{
      min: number;
      max: number;
      suggested: number;
      pricePerPerson: number;
      estimatedKm: number;
      estimatedHours: number;
    }>(`/requests/estimate?distanceKm=${params.distanceKm}&hours=${params.hours}&passengers=${params.passengers}&waypointsCount=${params.waypointsCount}`),

  // Viagens & Solicitações
  createRequest: (payload: any) =>
    request<any>('/requests', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getRadarRequests: () => request<any[]>('/requests/radar'),

  // Propostas & Contratação
  submitProposal: (providerId: string, payload: any) =>
    request<any>(`/proposals?providerId=${providerId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  acceptProposal: (clientId: string, proposalId: string) =>
    request<any>(`/proposals/${proposalId}/accept?clientId=${clientId}`, {
      method: 'POST',
    }),
};
